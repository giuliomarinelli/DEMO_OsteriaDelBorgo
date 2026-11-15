# Osteria del Borgo

Sito dimostrativo di una trattoria italiana **fittizia**, case study di portfolio. Nessuna attività reale, prenotazione operativa o raccolta dati.

## Stato: milestone 2

Qwik + Qwik City SSR, TypeScript strict, Tailwind CSS e adapter ufficiale Cloudflare Pages. Identità pomodoro/panna/basilico/inchiostro, font Fraunces locale, illustrazioni originali e immagini generate dichiarate. Homepage conviviale, storia, galleria, contatti e menu editoriale con sei assaggi statici, prezzi indicativi e allergeni demo. I filtri interattivi non sono implementati. Nessun backend business, database, autenticazione o integrazione esterna.

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

I dieci test verificano risposte HTML reali delle cinque rotte, metadati, navigazione, asset, stato 404, contenuti demo/allergeni, font e artefatti Pages. La build produce client in `dist` e moduli SSR in `server`, collegati da `dist/_worker.js`; tutte le pagine pubbliche sono escluse dal prerendering. La preview non richiede login Cloudflare. Fermare il runtime prima di reinstallare le dipendenze.

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

Restano catalogo completo, filtri e stati della funzionalità verticale nelle milestone successive. L'audit segnala vulnerabilità transitive upstream, documentate nel worklog. Nessun deploy, configurazione Access o promozione di branch eseguiti.
