# Osteria del Borgo

Sito dimostrativo di una trattoria italiana **fittizia**, case study di portfolio. Nessuna attività reale, prenotazione operativa o raccolta dati.

## Stato: menu interattivo e collaudo 4A parziale

Qwik + Qwik City SSR, TypeScript strict, Tailwind CSS e adapter ufficiale Cloudflare Pages. Identità pomodoro/panna/basilico/inchiostro, font Fraunces locale, illustrazioni originali e immagini generate dichiarate. Homepage conviviale, storia, galleria, contatti e menu interattivo con **18 piatti fittizi in cinque portate**. Categoria ed esclusioni multiple degli allergeni si combinano; conteggio, stato vuoto e reset si aggiornano nel browser con primitive Qwik. Prezzi e allergeni sono demo: i risultati non danno garanzie alimentari. Nessun backend business, database, autenticazione o integrazione esterna.

## Avvio

Node 22 LTS >=22.12 (verificato 22.16.0), npm 10.9.2. Dalla radice:

```powershell
npm ci
npm run dev
```

## Verifiche e preview SSR di produzione

```powershell
npm run typecheck
npm run lint
npm run build
npm run preview
```

In una seconda shell nella radice, con Wrangler in ascolto su `http://127.0.0.1:8797`:

```powershell
npm test
```

`npm test` esegue 21 test unitari della logica/dataset e 10 test HTTP SSR. I primi si possono eseguire anche da soli con `npm run test:unit`, senza server; importano il TypeScript effettivo con `--experimental-strip-types` di Node (avviso sperimentale atteso su Node 22.16). `npm run test:ssr` richiede la preview attiva e verifica HTML delle cinque rotte, metadati, navigazione, asset, 404, catalogo completo, controlli, allergeni, font e artefatti Pages. Il contatore iniziale e tutti i 18 piatti sono nell'HTML senza esecuzione JS client.

La build produce client in `dist` e moduli SSR in `server`, collegati da `dist/_worker.js`; tutte le pagine pubbliche sono escluse dal prerendering. La preview non richiede login Cloudflare. Fermare il runtime prima di reinstallare le dipendenze o ricostruire la build. Controlli browser/tastiera e procedura axe-core (solo sviluppo) in [WORKLOG.md](docs/WORKLOG.md).

`npm run fmt` e `npm run fmt.check` riguardano i file applicativi e la nuova documentazione; non modificano `AGENTS.md` o `docs/MVP.md`. Il lockfile è versionato. Nessuno script di deploy remoto incluso.

## Configurazione

Nessuna credenziale richiesta. `VITE_SITE_ORIGIN` facoltativo, pubblico e letto alla build: origine HTTP(S) senza slash finale, scelta dal proprietario. Se assente, nessun canonical viene emesso. Esempio locale e riproduzione in [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentazione

- [Specifica MVP](docs/MVP.md) e [regole repository](AGENTS.md).
- [Architettura e struttura](docs/ARCHITECTURE.md).
- [Direzione artistica e voce](docs/BRAND_DIRECTION.md).
- [Build, runtime locale, futura pubblicazione e rollback](docs/DEPLOYMENT.md).
- [Operazioni, verifiche e limiti](docs/WORKLOG.md).
- [Case study](docs/CASE_STUDY.md) e [crediti asset](docs/ASSETS.md).
- [Audit editoriale](docs/CONTENT_AUDIT.md), [collaudo manuale aperto](docs/QA_MANUAL.md) ed [evidenze 4A](docs/evidence/milestone-4a/README.md).

La milestone 4A conferma build, 21 test di logica in Node e 10 test HTTP sul runtime Pages; il collaudo visuale/interattivo resta parziale per il blocco del browser dopo il primo screenshot desktop. Le verifiche aperte sono elencate nella procedura manuale e non sono dichiarate superate. L'audit delle dipendenze è approfondito nel worklog: 12 segnalazioni, senza aggiornamenti forzati. Eventuali arricchimenti editoriali e prenotazioni simulate richiedono un nuovo task; nessun invio è implementato. Nessun deploy, configurazione Access o promozione di branch eseguiti.
