# Riproduzione locale e futura pubblicazione

## Stato e confini

Questa milestone prepara Cloudflare Pages SSR e lo verifica localmente. Nessun login, provisioning, deploy, DNS, Access, secret o pipeline remota viene configurato. Nome `osteria-del-borgo-demo` nel file Wrangler: valore descrittivo locale, non prova dell'esistenza di un progetto remoto.

## Prerequisiti

Repository su `feature/mvp-foundation`, Node 22 LTS >=22.12 (verificato 22.16.0), npm (verificato 10.9.2). Nessun account o credenziale necessario. Il primo avvio Wrangler può scaricare il runtime supportato dal pacchetto. Non usare `wrangler login` per la verifica locale.

Da una shell aperta nella radice:

```powershell
npm ci
npm run typecheck
npm run lint
npm run build
npm run preview
```

`npm run preview` serve `dist` su `http://127.0.0.1:8797` tramite Wrangler Pages/Workerd, solo loopback. La porta dedicata evita la 8788, risultata già occupata da un altro progetto. Controllare l'URL effettivamente stampato e il titolo Osteria del Borgo. Lasciare aperta questa shell. In una seconda shell nella stessa cartella:

```powershell
npm test
curl.exe -sS http://127.0.0.1:8797/
curl.exe -sS http://127.0.0.1:8797/storia/
```

Gli otto test leggono l'HTML HTTP, rimuovono script/commenti prima di verificare titoli e contenuto, controllano collegamenti e asset e richiedono uno stato 404 reale. Nessuna esecuzione JavaScript del client necessaria. Il test degli artefatti controlla `_worker.js`, `_routes.json` e l'assenza di `index.html` statici per tutte le pagine. Un server non avviato causa un errore, non un successo simulato. Per cambiare porta: `npm run preview -- --port 8790`, poi `$env:SSR_BASE_URL = 'http://127.0.0.1:8790'` nella shell dei test. Chiudere il server con Ctrl+C. Fermare Wrangler prima di `npm ci`: Windows blocca la rimozione degli eseguibili in uso (`EPERM` su esbuild/Workerd). Da terminali automatizzati Ctrl+C può lasciare processi figli: verificare il loro percorso eseguibile e terminare soltanto quelli sotto `node_modules` di questa repository; non terminare globalmente tutti i processi Node o Wrangler.

Per sviluppare con HMR: `npm run dev`. La verifica SSR di accettazione rimane quella sulla build di produzione.

## Artefatti

- `dist/build/*`: moduli client Qwik, con nomi hash.
- `dist/assets/*`: CSS Tailwind e grafo dei bundle.
- `dist/_worker.js`: ingresso SSR Pages in advanced mode, collegato a `server/entry.cloudflare-pages.js` e relativi chunk (inclusi da Wrangler nel bundle).
- `dist/_routes.json`: instradamento delle richieste alla funzione.
- SVG e file pubblici copiati da `public`.

Non pubblicare solo gli asset client o sostituire `_worker.js` con fallback SPA. Le cartelle `dist` e `server` non sono versionate. Non eliminare `server` prima che Wrangler abbia risolto gli import. `build.server` dipende dal precedente `build.client`; normalmente usare `npm run build`. Il post-build ufficiale genera una 404 ausiliaria ma nessun HTML statico per le cinque pagine pubbliche: `include: []` e `exclude: ["/*"]` impediscono il loro prerendering. `ssg: null` non è utilizzabile in questa versione perché salta anche la generazione degli artefatti Pages.

## Canonical facoltativo

Il proprietario potrà scegliere l'origine pubblica effettiva. Nessun dominio è preimpostato. `VITE_SITE_ORIGIN` è una configurazione pubblica di build, non un secret; non contiene path o slash finale. Per testarla **solo localmente** con un dominio riservato agli esempi:

```powershell
$env:VITE_SITE_ORIGIN = 'https://osteria.example'
npm run build
# Riavviare npm run preview dopo la build, se era già in esecuzione.
$env:EXPECTED_CANONICAL_ORIGIN = 'https://osteria.example'
npm test
Remove-Item Env:EXPECTED_CANONICAL_ORIGIN
Remove-Item Env:VITE_SITE_ORIGIN
```

Un'origine invalida interrompe la configurazione Vite. La variabile viene incorporata nei bundle: un cambiamento richiede una nuova build. Nessuna impostazione privata o credenziale locale va committata; `.env*` e `.dev.vars*` sono ignorati.

## Configurazione futura riservata al proprietario

Solo dopo decisione esplicita: scegliere il progetto Cloudflare Pages, verificare Node nella build image, impostare comando `npm ci && npm run build`, output `dist` e configurazione pubblica dell'origine scelta. L'adapter e Wrangler sono configurati in base alle [istruzioni Qwik](https://qwik.dev/docs/deployments/cloudflare-pages/) e alla [documentazione Pages locale](https://developers.cloudflare.com/pages/functions/local-development/).

Non sono presenti script di deploy né pipeline in questa milestone. `develop` integra lo sviluppo, `preview` è staging, `master` produzione. Il proprietario decide promozioni e deve proteggere lo staging con Access **prima** di pubblicarlo. Un futuro collegamento Git/Pages deve limitare i branch pubblicabili per evitare che un semplice push di sviluppo esponga la demo. Questa consegna non modifica tali impostazioni e non attesta lo stato di alcun account.

## Rollback

Locale: fermare Wrangler, usare una copia di lavoro pulita della revisione nota, eseguire `npm ci`, `npm run build`, `npm run preview` e `npm test`. Durante questa fase non eseguire merge o rebase e non usare reset distruttivi sul lavoro locale.

Remoto futuro: il proprietario può ripristinare una precedente pubblicazione valida dalla cronologia deploy di Pages, mantenendo Access e configurazioni di ambiente. Dopo il ripristino deve verificare homepage, rotta interna, metadati e asset. Se il problema deriva da una variabile di build, correggerla e ricostruire la revisione scelta. Nessun dato applicativo da migrare o recuperare: questa demo non ha database. Una correzione Git successiva deve essere un commit di revert revisionato, non un force push.
