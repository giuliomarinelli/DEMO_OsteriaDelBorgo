# Osteria del Borgo — case study

## Problema e obiettivo

Costruire un sito credibile per una trattoria italiana fittizia e dimostrare qualità di implementazione, velocità percepita e accessibilità. La futura funzionalità distintiva sarà un menu locale con categorie ed esclusione degli allergeni, combinabili e azzerabili. La milestone 2 completa identità visiva e contenuti; la funzionalità interattiva resta alla fase successiva.

## Milestone 1

Scaffold Qwik City ufficiale, SSR, adapter Cloudflare Pages, TypeScript strict e Tailwind. Homepage iniziale e quattro destinazioni pubbliche funzionanti: storia, menu, ambiente e contatti. Header/footer condivisi, navigazione mobile progressiva, metadati, pagina 404 e dichiarazioni demo visibili.

Il contenuto non pretende di rappresentare un ristorante operativo: storia, marchio e luogo sono fittizi. La pagina menu esplicita lo stato iniziale; non contiene ancora dataset o filtri. Contatti non raccoglie dati e non promette prenotazioni reali.

## Milestone 2

Palette pomodoro/panna/basilico/inchiostro, titoli Fraunces 800 locale, pomodoro inciso originale e hero centrale con pranzo condiviso. Immagini generate dichiarate, WebP responsive e manifesto vettoriale originale. Le cinque pagine hanno contenuti completi: storia fittizia, sei assaggi statici con prezzi e allergeni demo, ambiente e FAQ. Nessun filtro o invio reale. La direzione è documentata in [BRAND_DIRECTION.md](BRAND_DIRECTION.md).

## Scelte progettuali della foundation

- Identità editoriale crema, oliva e terracotta; illustrazioni vettoriali originali al posto di fotografie attribuite a un locale inesistente.
- Tipografia di sistema e asset locali per evitare richieste a provider esterni.
- Qwik City file-based e rendering streaming, senza un backend business separato.
- Adapter ufficiale Pages con SSG disattivato; verifica sul runtime locale Cloudflare.
- Componenti condivisi solo per parti realmente ripetute; nessuna infrastruttura per dati non ancora presenti.
- HTML nativo per il controllo mobile: la navigazione resta disponibile senza JavaScript.

## Evidenze e limiti

La verifica tecnica usa typecheck, lint, build e test HTTP riproducibili sulle cinque pagine; le risposte devono contenere testo e metadati dopo la rimozione degli script. Il worklog registra risultati effettivi e verifiche browser. Non vengono dichiarati risultati Lighthouse, audit WCAG completo, compatibilità Safari o prestazioni in produzione senza misurazioni.

Rimangono il catalogo completo di almeno dodici piatti, i filtri e gli stati vuoti della funzionalità verticale. I sei assaggi attuali sono esempi editoriali, non il completamento della milestone interattiva. Audit delle dipendenze: residui upstream documentati nel worklog; nessuna pretesa di assenza di vulnerabilità. Nessun deployment remoto eseguito e nessuna promozione fra branch autorizzata da questa milestone.

Crediti degli asset: [ASSETS.md](ASSETS.md). Architettura e riproduzione: [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md).
