# MVP - Osteria del Borgo

## Prodotto
Sito dimostrativo per una trattoria italiana fittizia, con identita' visiva originale. Elemento distintivo: menu digitale interattivo con filtri per categoria e allergeni.

## Pagine
- Home con proposta gastronomica e invito alla consultazione del menu
- La nostra storia (narrativa fittizia, dichiarata)
- Menu interattivo
- Galleria e ambiente
- Contatti e prenotazioni simulate, senza invio effettivo

## Funzionalita' verticale
- Piatti mock con nome, descrizione, prezzo indicativo, categoria e allergeni espliciti.
- Filtri per categoria e per esclusione di uno o piu' allergeni; combinabili, azzerabili e accessibili da tastiera.
- Stato 'nessun risultato' e legenda chiara degli allergeni.
- Non dedurre sicurezza alimentare: mostra avviso che dati e filtri sono dimostrativi e non sostituiscono informazioni ufficiali sugli allergeni.
- Nessuna prenotazione reale, backend, database o invio dati.

## Criteri di accettazione
- Layout originale, responsive e navigazione accessibile.
- Almeno 12 piatti fittizi ripartiti in categorie.
- Filtri combinabili corretti e testati; reset funzionante.
- Prezzi e informazioni indicati come demo; nessuna recensione reale inventata.
- Typecheck, lint, test applicabili e build di produzione completati.

## Milestone iniziale
1. Scaffold React/Vite/TypeScript strict/Tailwind e componenti base.
2. Home e struttura pagine con design coerente.
3. Menu, filtri e test.
4. Accessibilita', documentazione, istruzioni Cloudflare Pages; nessun deploy remoto senza autorizzazione.

## Branch e deployment
- feature/* da develop per ogni milestone; integrare su develop dopo verifica.
- preview: staging, protetto con Cloudflare Access prima della pubblicazione.
- master: produzione.
- Preparare la procedura Pages/Wrangler senza modificare account, DNS, secrets o infrastruttura remota.
