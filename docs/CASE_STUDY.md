# Osteria del Borgo — case study

## Problema e obiettivo

Costruire un sito credibile per una trattoria italiana fittizia e dimostrare qualità di implementazione, velocità percepita e accessibilità. La funzionalità distintiva è un menu locale con categorie ed esclusione degli allergeni, combinabili e azzerabili. Dopo foundation e identità visiva, la milestone 3 completa questa esperienza senza introdurre backend o servizi.

## Milestone 1

Scaffold Qwik City ufficiale, SSR, adapter Cloudflare Pages, TypeScript strict e Tailwind. Homepage iniziale e quattro destinazioni pubbliche funzionanti: storia, menu, ambiente e contatti. Header/footer condivisi, navigazione mobile progressiva, metadati, pagina 404 e dichiarazioni demo visibili.

Il contenuto non pretende di rappresentare un ristorante operativo: storia, marchio e luogo sono fittizi. La pagina menu esplicita lo stato iniziale; non contiene ancora dataset o filtri. Contatti non raccoglie dati e non promette prenotazioni reali.

## Milestone 2

Palette pomodoro/panna/basilico/inchiostro, titoli Fraunces 800 locale, pomodoro inciso originale e hero centrale con pranzo condiviso. Immagini generate dichiarate, WebP responsive e manifesto vettoriale originale. Le cinque pagine hanno contenuti completi: storia fittizia, sei assaggi statici con prezzi e allergeni demo, ambiente e FAQ. Nessun filtro o invio reale. La direzione è documentata in [BRAND_DIRECTION.md](BRAND_DIRECTION.md).

## Milestone 3

Il catalogo passa a 18 piatti, distribuiti fra cinque portate, con descrizioni, prezzi indicativi e allergeni strutturati. Radio per la portata e checkbox per escludere più allergeni: la categoria si combina con tutte le esclusioni e basta un allergene indicato per nascondere un piatto. Conteggio annunciato, stato vuoto esplicativo e due punti di reset rendono visibile l'effetto delle scelte. La grafica riprende bordi, titoli e palette del menu editoriale; una sola immagine gastronomica pertinente, già disponibile e dichiarata generata, accompagna le tagliatelle.

Lo stato è locale con `useStore`, i risultati derivano con `useComputed$` e la selezione è una funzione pura testabile. Il primo HTML SSR contiene tutti i 18 piatti, allergeni e metadati: leggere il menu non richiede JavaScript. Nessuna ricerca remota, persistenza o raccolta dati. La home continua a mostrare tre assaggi scelti per ID dal catalogo comune.

L'interazione non trasforma i dati inventati in informazioni alimentari affidabili. Avvertenza e legenda rimangono presenti anche nello stato vuoto; nessuna etichetta «sicuro», garanzia o deduzione da un elenco di allergeni vuoto. Controlli nativi, istruzioni, focus visibile e un conteggio live conservano una navigazione da tastiera comprensibile.

La verifica sul browser ha rilevato due difetti sfuggiti ai soli test di logica: CSS contenuto in `noscript` che diventava attivo durante l'aggiornamento DOM e un raggruppamento derivato che lasciava righe obsolete mentre aggiornava il contatore. La versione consegnata usa la media query CSS globale per il fallback e ricava le sezioni direttamente dai risultati con props reattive. Le verifiche successive confrontano gli ID realmente renderizzati: 18 iniziali, 9 escludendo latte, uno selezionando anche primi, zero aggiungendo grano, 18 dopo reset.

## Milestone 4A: verifica e limiti di accettazione

Reinstallazione dal lockfile, typecheck, lint e build di produzione confermati. Trentuno test passati: 21 unitari in Node, inclusi due nuovi casi sul catalogo effettivo e tutte le esclusioni, e 10 HTTP SSR su Wrangler locale. L'analisi statica del bundle approfondisce le 12 segnalazioni npm senza aggiornamenti forzati; non trasforma l'assenza dei marker cercati in una garanzia di sicurezza.

Il browser ha prodotto la sola vista iniziale della home desktop, poi è rimasto bloccato durante l'attesa delle risorse. Il collaudo visuale delle altre pagine, i viewport mobile e le interazioni reali non sono dichiarati superati in questa esecuzione. Preparata una [procedura manuale](QA_MANUAL.md) con matrice, casi limite e risultati attesi, distinta dalle evidenze storiche della milestone 3. [CONTENT_AUDIT.md](CONTENT_AUDIT.md) indica opportunità concrete per storia e galleria, senza introdurre nuovi contenuti pubblici o restyling. Nessuna modifica al codice applicativo sulla base di difetti non riprodotti.

Su successiva richiesta esplicita è ripreso il collaudo: 20 misure DOM sulle cinque pagine e screenshot completi di home, storia e menu a 1440/768/390/320 px. Il controllo visuale ha individuato il pomodoro decorativo sopra il titolo della hero a 320 px, pur senza overflow orizzontale. Una regola limitata a 360 px lo nasconde, preservando testi e marchio nell'header. È un esempio concreto del limite dei soli controlli geometrici di overflow. Ulteriori screenshot e input hanno incontrato timeout: la copertura attuale è nella checklist, senza attribuire nuovi pass ai filtri o alla tastiera.

## Scelte progettuali della foundation

- Identità editoriale crema, oliva e terracotta; illustrazioni vettoriali originali al posto di fotografie attribuite a un locale inesistente.
- Tipografia di sistema e asset locali per evitare richieste a provider esterni.
- Qwik City file-based e rendering streaming, senza un backend business separato.
- Adapter ufficiale Pages con SSG disattivato; verifica sul runtime locale Cloudflare.
- Componenti condivisi solo per parti realmente ripetute; nessuna infrastruttura per dati non ancora presenti.
- HTML nativo per il controllo mobile: la navigazione resta disponibile senza JavaScript.

## Evidenze e limiti

La verifica tecnica usa typecheck, lint, build e test HTTP riproducibili sulle cinque pagine; le risposte devono contenere testo e metadati dopo la rimozione degli script. Il worklog registra risultati effettivi e verifiche browser. Non vengono dichiarati risultati Lighthouse, audit WCAG completo, compatibilità Safari o prestazioni in produzione senza misurazioni.

Milestone 3 verificata con 19 test unitari e 10 test SSR, typecheck, lint e build di produzione. Controlli tastiera, responsive e axe-core nel worklog, con limiti espliciti. Eventuali ulteriori rifiniture della milestone 4 e prenotazioni simulate restano a un task successivo: contatti continua a non inviare dati. Audit delle dipendenze: residui upstream documentati nel worklog; nessuna pretesa di assenza di vulnerabilità. Nessun deployment remoto eseguito e nessuna promozione fra branch autorizzata da questa milestone.

Crediti degli asset: [ASSETS.md](ASSETS.md). Architettura e riproduzione: [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md).
