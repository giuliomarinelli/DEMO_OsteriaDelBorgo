# Collaudo manuale da completare — milestone 4A

Questa è una procedura riproducibile, **non un elenco di prove superate**. Il 15 novembre 2026 l'automazione ha acquisito la sola vista iniziale della home a 1440×1000, poi si è bloccata nell'attesa delle risorse durante la prima matrice di controllo. Non sono stati ripetuti tentativi browser dopo l'interruzione. I risultati della milestone 3 restano evidenze storiche; non sono attribuiti a questa esecuzione.

## Preparazione

PowerShell nella radice della repository, Node 22.16.0 e npm 10.9.2 usati nel collaudo. Nessun account o login Cloudflare richiesto. Chiudere soltanto l'eventuale precedente preview di questo progetto prima di reinstallare o ricostruire; non fermare server di altri progetti.

```powershell
npm ci
npm run typecheck
npm run lint
npm run build
node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port 8798 --inspector-port 0
```

Se 8798 è già occupata, scegliere una porta libera e usarla coerentemente in URL e test. Non terminare il processo che la occupa senza verificarne l'appartenenza. In una seconda shell nella stessa radice:

```powershell
$env:SSR_BASE_URL = 'http://127.0.0.1:8798'
npm test
```

Aprire `http://127.0.0.1:8798/` in un browser ordinario; confermare il titolo Osteria del Borgo. DevTools permette di impostare una larghezza CSS precisa: desktop 1440×1000, tablet 768×1000, mobile 390×844 e 320×844. Il ridimensionamento non simula Safari o un dispositivo fisico. Salvare screenshot con dimensioni, rotta, stato dei filtri, data e revisione, senza barra indirizzi o altre schede del proprietario.

## Matrice visuale

Per **ogni cella**: scorrere dall'inizio al footer, aspettare il caricamento naturale delle immagini anche lazy, controllare titoli non tagliati, testo non sovrapposto, prezzi e allergeni leggibili, margini laterali, pulsanti, menu di navigazione e assenza di scorrimento orizzontale. Provare i collegamenti della pagina e tornare indietro. Verificare anche a zoom 200% il ritorno a capo e il raggiungimento dei controlli, senza presumere che un test a 320 px sostituisca questa prova.

| Pagina                | 1440 px                                     | 768 px      | 390 px      | 320 px      |
| --------------------- | ------------------------------------------- | ----------- | ----------- | ----------- |
| Home `/`              | Solo vista iniziale acquisita; resto aperto | Da eseguire | Da eseguire | Da eseguire |
| Storia `/storia/`     | Da eseguire                                 | Da eseguire | Da eseguire | Da eseguire |
| Menu `/menu/`         | Da eseguire                                 | Da eseguire | Da eseguire | Da eseguire |
| Galleria `/galleria/` | Da eseguire                                 | Da eseguire | Da eseguire | Da eseguire |
| Contatti `/contatti/` | Da eseguire                                 | Da eseguire | Da eseguire | Da eseguire |

Nel menu ripetere ogni viewport in stato completo, filtrato e vuoto. Leggere anche la didascalia delle tagliatelle e la legenda in fondo. A 768 px controllare il passaggio fra navigazione desktop e mobile attorno al breakpoint di 760 px. A 390/320 px verificare etichette lunghe e righe nome/prezzo; le etichette dei filtri hanno `min-height: 44px` nel CSS, ma il risultato visivo va ancora confermato.

Screenshot rappresentativi ancora da acquisire: home 390, storia 768, filtri menu 1440, menu vuoto 390, galleria 320, contatti 390 con FAQ aperta. L'unico file prodotto in 4A è [home-1440.png](evidence/milestone-4a/home-1440.png); non estende la copertura alle sezioni fuori dalla vista.

## Menu: casi e valori limite

Su una richiesta nuova a `/menu/` devono comparire tutti i 18 piatti. Contare **le righe effettive**, non soltanto il riepilogo. Gli ID si possono leggere anche con questo comando nella console DevTools:

```javascript
console.log(
  document.querySelector("#menu-result-count").textContent,
  [...document.querySelectorAll("[data-dish-id]")].map(
    (el) => el.dataset.dishId,
  ),
);
```

| Caso                                              | Risultato atteso dalla logica/dataset verificati nei test unitari; comportamento UI da verificare                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Nessuna selezione aggiuntiva                      | 18 righe, Tutte le portate selezionato, nessuna esclusione; reset principale disabilitato                           |
| Una portata alla volta                            | Antipasti 4, primi 4, secondi 4, contorni 3, dolci 3; restano soltanto le sezioni con risultati                     |
| Tutte + Latte                                     | 9 righe: caponata, crostino ceci, spaghetti, pollo, baccalà, polpettone, patate, cicoria e finocchi                 |
| Primi + Latte                                     | Solo `spaghetti-vongole`, riepilogo al singolare                                                                    |
| Aggiungere Grano (glutine) al caso precedente     | Zero righe, messaggio «Qui il piatto è vuoto», ripristino disponibile; avvertenza e legenda restano presenti        |
| Togliere soltanto Latte lasciando Grano e Primi   | Solo `risotto-funghi`: verifica della deselezione, oltre all'aggiunta delle esclusioni                              |
| Reset principale                                  | Tutte le 18 righe ripristinate, radio Tutte e nessun checkbox selezionato, reset disabilitato                       |
| Dolci + Latte, poi reset nello stato vuoto        | Zero, quindi 18 con selezioni azzerate; nessun controllo nascosto dopo l'aggiornamento                              |
| Tutte + tutti i 12 allergeni esclusi              | Solo `patate-rosmarino` e `cicoria-ripassata`; «nessuno indicato» resta un dato inventato senza garanzie alimentari |
| Tutte le esclusioni + ogni portata                | Contorni 2; antipasti, primi, secondi e dolci 0                                                                     |
| Selezionare/deselezionare più volte e rapidamente | Contatore, righe e checkbox coerenti; nessun duplicato, errore console o elenco rimasto allo stato precedente       |
| Ricaricamento completo della pagina               | Nuovo HTML SSR con 18 piatti; nessuna selezione persistita dall'app in URL o storage                                |

Il dataset vuoto, l'allergene assente e gli input non mutati sono coperti dai test di logica. Non c'è un endpoint di ricerca o prenotazione che produca errori di rete applicativi da simulare. Non introdurre deliberatamente eccezioni, immagini mancanti o API per creare nuovi stati UI in questa milestone.

## Tastiera, navigazione e accessibilità

1. Ricaricare la home, premere Tab: lo skip link deve essere visibile; Invio deve raggiungere il main `contenuto`.
2. Desktop: attraversare i link dell'header con Tab e aprire una rotta interna con Invio. Controllare titolo, H1 e `aria-current="page"`. Mobile: raggiungere Esplora, aprire con Invio, attraversare tutti i link e raggiungere Menu.
3. Nei filtri usare frecce nel gruppo radio, Tab fra gruppi e checkbox, Space per le esclusioni. Ripetere tutti i casi della tabella senza mouse. Il focus deve restare riconoscibile, senza trappole o spostamenti automatici durante il filtro. Provare entrambi i reset con Invio e il collegamento «Vai ai risultati».
4. Con uno screen reader, se disponibile, verificare nome e stato dei controlli, legende/istruzioni e annuncio del conteggio. L'HTML contiene `role="status"`/`aria-live`, ma questo non dimostra la lettura effettiva. Annotare browser, screen reader e versioni.
5. Contatti: aprire e chiudere le quattro FAQ con tastiera; verificare che nessun invio, recapito operativo o prenotazione reale sia proposto. Aprire `/pagina-inesistente/`: pagina utile con vero HTTP 404, già verificato anche via test HTTP.
6. Disabilitare JavaScript nelle impostazioni DevTools e ricaricare direttamente home e menu. Contenuti e metadati devono restare disponibili; sul menu i 18 piatti e il testo `noscript` devono essere leggibili. Nei browser che supportano `scripting: none`, i controlli non utilizzabili sono nascosti. Riattivare JS al termine.
7. Console/Network: annotare errori durante navigazione, caricamento immagini e prima interazione Qwik; nessun caricamento di chunk deve fallire. Non attribuire automaticamente all'app script iniettati da estensioni locali.

Per axe-core usare il file locale e la procedura nel worklog della milestone 3. Eseguire la scansione sulle cinque pagine e sul menu vuoto; registrare anche `incomplete`, senza contarli come pass. La segnalazione storica sulle frecce decorative richiede controllo manuale nell'interfaccia effettiva. Nessuna nuova scansione axe è riuscita in 4A prima del blocco.

## Registrazione e chiusura

Per ogni difetto conservare rotta, viewport, selezioni, passi esatti, atteso/osservato e screenshot. Ripetere una volta per confermare la riproducibilità prima di correggere. Se il browser di automazione resta bloccato, non riavviare ciclicamente driver, schede o runtime: proseguire con browser manuale e lasciare aperta la voce non verificata. Nessun risultato di un altro sito sulla stessa macchina è valido per questa app.

Al termine chiudere la propria preview. Per processi orfani Windows seguire la procedura mirata di [DEPLOYMENT.md](DEPLOYMENT.md); nessuna terminazione globale dei processi Node. I pass mancanti di questa checklist vanno registrati con data e nuova revisione, senza riscrivere come superato il collaudo parziale del 15 novembre.
