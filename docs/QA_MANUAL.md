# Collaudo funzionale e visuale — milestone 4A

Stato al 15 novembre 2026: **completati i controlli browser principali rimasti aperti**, sulla build Qwik City SSR di produzione nel runtime locale Wrangler. Base `44bf7b8`, più correzione circoscritta di header e selettore CSS. Le prove interrotte precedenti restano tali nel worklog: questo documento descrive la copertura attuale, senza convertirle retroattivamente in pass.

## Riproduzione

Dalla radice, Node 22.16.0 e npm 10.9.2 usati nel collaudo. Fermare solo la preview di questo progetto prima di reinstallare o ricostruire; non terminare runtime di altri progetti.

```powershell
npm ci
npm run typecheck
npm run lint
npm run build
npm run preview
# Seconda shell, stessa radice:
npm test
curl.exe -sS http://127.0.0.1:8797/menu/
```

Verificare HTTP 200 e titolo Osteria del Borgo prima del browser. Aprire una scheda dedicata a `http://127.0.0.1:8797/`; controllare URL e viewport prima di ogni sequenza. Tenere Chrome visibile accanto alla chat: durante i blocchi precedenti la scheda era hidden e non produceva frame; `bringToFront` da solo non ripristinava la visibilità. Nessun riavvio o modifica ai browser condivisi. Non usare eventi sintetici o modifiche allo stato applicativo per ottenere un pass.

## Matrice visuale

Misure e catture esaminate dall'inizio al footer, immagini lazy caricate naturalmente dopo scorrimento. Dimensioni in pixel CSS; non simulano Safari o dispositivi fisici.

| Pagina                | 1440×1000                                    | 768×1000                            | 390×844                                                     | 320×844                                                |
| --------------------- | -------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| Home                  | DOM + screenshot, ripresa precedente         | DOM + screenshot, precedente        | DOM + screenshot, precedente                                | DOM + screenshot e regressione decorazione, precedente |
| Storia                | DOM + screenshot, precedente                 | DOM + screenshot, precedente        | DOM + screenshot, precedente                                | DOM + screenshot, precedente                           |
| Menu iniziale         | DOM + screenshot, precedente                 | DOM + screenshot, precedente        | DOM + screenshot, precedente                                | DOM + screenshot, precedente                           |
| Galleria              | DOM + screenshot completo finale, 3 immagini | DOM + screenshot finale, 3 immagini | DOM + screenshot finale, 3 immagini                         | DOM + screenshot completo precedente                   |
| Contatti              | DOM + screenshot finale                      | DOM + screenshot finale             | Screenshot precedente + FAQ azionate e nuova cattura finale | DOM + screenshot finale                                |
| Menu filtrato e vuoto | Entrambi finali                              | Entrambi finali                     | Entrambi finali                                             | Entrambi finali                                        |

Nelle sei celle completate non rilevati overflow, titoli tagliati, immagini mancanti o nodi ispezionati fuori viewport. Nei due stati del menu a ogni larghezza: conteggio e ID corretti, etichette alte almeno 44 px e non tagliate, avvertenza e legenda presenti. Verificati visivamente nomi/prezzi, ritorni a capo, gerarchia, controlli e spaziature. I bitmap full-page sono larghi quanto il contenuto senza scrollbar di 15 px: i soli bordi dell'immagine non provano overflow.

Sono state ricatturate 16 immagini dopo la build finale del selettore CSS, con scroll iniziale zero; cinque rappresentative sono versionate. Una prima cattura con pagina scorsa mostrava lo skip link fuori posizione nel bitmap: nel DOM non focalizzato era sopra il viewport (bottom −20,72 px). La cattura dall'inizio evita l'artefatto; nessuna modifica al CSS dello skip link. [Manifest e screenshot](evidence/milestone-4a/README.md).

## Menu: risultati osservati nel browser

**23 casi con input nativi normali** (check/uncheck/click, senza force): [report con ID delle righe](evidence/milestone-4a/browser-functional-final.json). Suite eseguita prima della correzione header, senza successive modifiche alla logica/dati del menu. Tastiera e responsive eseguiti dopo la correzione header; ricatture dopo il CSS finale.

| Caso                                        | Risultato osservato                                    |
| ------------------------------------------- | ------------------------------------------------------ |
| Nessun filtro                               | 18 righe; reset disabilitato                           |
| Cinque portate, una alla volta              | 4 / 4 / 4 / 3 / 3 righe                                |
| Tutte + Latte                               | 9 righe, ID esatti verificati                          |
| Primi + Latte                               | Solo spaghetti-vongole, conteggio al singolare         |
| Aggiungere Grano (glutine)                  | Zero righe e stato vuoto                               |
| Togliere solo Latte lasciando Grano e Primi | Solo risotto-funghi                                    |
| Reset principale                            | 18 righe, Tutte, checkbox azzerati, reset disabilitato |
| Dolci + Latte; reset dallo stato vuoto      | 0, poi 18                                              |
| Tutti i 12 allergeni esclusi                | Solo patate-rosmarino e cicoria-ripassata              |
| Tutte le esclusioni + ciascuna portata      | 0 / 0 / 0 / 2 / 0                                      |
| Tre cicli check/uncheck Latte               | Conteggio e righe coerenti, ritorno a 18               |
| Reload con filtri attivi                    | 18 righe SSR, selezioni iniziali                       |

Per ogni caso confrontati conteggio e ID effettivi, numero delle informazioni allergeni con le righe visibili, avvertenza, legenda e stato dei reset. Allergen-free non è una garanzia deducibile dai dati inventati. Dataset vuoto, allergene assente e immutabilità degli input sono coperti dai test unitari. Non esistono endpoint business o richieste di prenotazione per cui simulare errori di rete.

Per riprodurre i conteggi in DevTools:

```javascript
console.log(
  document.querySelector("#menu-result-count").textContent,
  [...document.querySelectorAll("[data-dish-id]")].map(
    (el) => el.dataset.dishId,
  ),
);
```

L'etichetta Grano (glutine) ha ID/valore `glutine`, non `grano`.

## Tastiera, navigazione e FAQ

Nove sequenze riuscite: Tab sullo skip link e Invio al main; navigazione desktop con Tab/Invio; menu mobile Esplora con Invio e accesso al menu; frecce sui radio; Tab/Space sui checkbox; stato vuoto; reset principale e reset nello stato vuoto con Invio; collegamento ai risultati focalizzabili. Focus di 3 px verificato, nessuna trappola nei percorsi eseguiti. Quattro FAQ aperte/chiuse con Tab/Invio e focus visibile, ciascuna riportata allo stato iniziale; cattura aggiuntiva con tutte aperte.

Sette controlli di navigazione dopo la correzione header, inclusi indietro/avanti, mostrano una sola voce desktop `aria-current=page`. Ulteriore regressione dopo il CSS finale sulle cinque destinazioni: solo la voce corrente sottolineata, tutte le inattive senza sottolineatura dopo aver allontanato il puntatore. Prima della correzione, home→storia lasciava attive sia home sia storia. [Report browser finale](evidence/milestone-4a/browser-final.json).

## Accessibilità, console e limiti

Riutilizzate le cinque scansioni axe iniziali già riuscite, senza ripeterle. Aggiunta scansione axe-core 4.14.0 sul menu vuoto a 390×844: **0 violazioni, 24 regole passate**. `color-contrast` resta incomplete su quattro simboli decorativi aria-hidden (menu mobile, freccia ai risultati, frecce dei due reset). Non sono pass automatici né prova di conformità WCAG completa. Palette e focus sono leggibili nelle catture; nessuna modifica generale al design.

Ultimo controllo console: zero errori e warning. Registro Network limitato all'origine locale: 1176 richieste, 1089 HTTP 200 e 87 HTTP 304, nessun HTTP 4xx/5xx o errore di rete registrato. Include navigazioni e risorse ripetute della sessione: non è una misura di prestazioni o del costo di una singola pagina.

Restano **non eseguite** queste verifiche ulteriori; nessun pass attribuito:

- Screen reader: nomi, stato dei controlli e annuncio live effettivo.
- Zoom reale del browser al 200%: il viewport 320 px non lo sostituisce.
- Disabilitazione JavaScript dalle impostazioni del browser. La disponibilità di HTML, contenuti e metadati senza esecuzione JS è verificata dai 10 test HTTP SSR.
- Safari, dispositivi fisici, Lighthouse e prestazioni di un hosting pubblico.

La pagina 404 e gli asset sono coperti dai test HTTP; non ripetuti nel browser senza necessità. Le 12 segnalazioni audit upstream restano documentate, senza aggiornamenti forzati o nuova risoluzione delle dipendenze.

## Chiusura

Chiusa soltanto la scheda dedicata e fermata la preview propria dopo verifica di percorso e PID; nessun listener su 8797. Browser condivisi e servizi Cloudflare invariati. Per una nuova verifica conservare rotta, viewport, selezioni, passi, atteso/osservato e screenshot. Le prove storiche interrotte e la diagnosi del blocco rimangono nel worklog e nei report precedenti.
