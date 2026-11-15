# Osteria del Borgo — case study

## Problema e obiettivo

Costruire un sito credibile per una trattoria italiana fittizia e dimostrare qualità di implementazione, velocità percepita e accessibilità. La futura funzionalità distintiva sarà un menu locale con categorie ed esclusione degli allergeni, combinabili e azzerabili. Questa consegna si ferma alle fondamenta e alla struttura iniziale.

## Milestone 1

Scaffold Qwik City ufficiale, SSR, adapter Cloudflare Pages, TypeScript strict e Tailwind. Homepage iniziale e quattro destinazioni pubbliche funzionanti: storia, menu, ambiente e contatti. Header/footer condivisi, navigazione mobile progressiva, metadati, pagina 404 e dichiarazioni demo visibili.

Il contenuto non pretende di rappresentare un ristorante operativo: storia, marchio e luogo sono fittizi. La pagina menu esplicita lo stato iniziale; non contiene ancora dataset o filtri. Contatti non raccoglie dati e non promette prenotazioni reali.

## Scelte progettuali

- Identità editoriale crema, oliva e terracotta; illustrazioni vettoriali originali al posto di fotografie attribuite a un locale inesistente.
- Tipografia di sistema e asset locali per evitare richieste a provider esterni.
- Qwik City file-based e rendering streaming, senza un backend business separato.
- Adapter ufficiale Pages con SSG disattivato; verifica sul runtime locale Cloudflare.
- Componenti condivisi solo per parti realmente ripetute; nessuna infrastruttura per dati non ancora presenti.
- HTML nativo per il controllo mobile: la navigazione resta disponibile senza JavaScript.

## Evidenze e limiti

La verifica tecnica usa typecheck, lint, build e test HTTP riproducibili sulle cinque pagine; le risposte devono contenere testo e metadati dopo la rimozione degli script. Il worklog registra risultati effettivi e verifiche browser. Non vengono dichiarati risultati Lighthouse, audit WCAG completo, compatibilità Safari o prestazioni in produzione senza misurazioni.

Rimangono da sviluppare i contenuti completi delle pagine, almeno dodici piatti fittizi, i filtri e gli stati vuoti della funzionalità verticale. Audit delle dipendenze: residui upstream documentati nel worklog; nessuna pretesa di assenza di vulnerabilità. Nessun deployment remoto eseguito e nessuna promozione fra branch autorizzata da questa milestone.

Crediti degli asset: [ASSETS.md](ASSETS.md). Architettura e riproduzione: [ARCHITECTURE.md](ARCHITECTURE.md), [DEPLOYMENT.md](DEPLOYMENT.md).
