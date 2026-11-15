# Worklog

## 2026-11-15 — Milestone 1: fondamenta e struttura iniziale

### Obiettivo e perimetro

Preparare una vera applicazione Qwik City SSR e la struttura pubblica iniziale. Implementare layout, identità, homepage e rotte funzionanti senza anticipare dataset/filtri del menu o prenotazioni simulate. Nessun deploy remoto.

### Verifiche preliminari

- Letti integralmente `AGENTS.md` e `docs/MVP.md`; conservati senza modifiche.
- `git status --short`: pulito all'inizio; branch `develop`.
- `git fetch origin`, `git rev-list --left-right --count develop...origin/develop`: `0 0`.
- Nessun branch locale o remoto `feature/mvp-foundation` preesistente; `git switch -c feature/mvp-foundation develop`.
- Nessun merge, rebase, worktree o subagente. Branch `preview` e `master` non modificati.

### Operazioni e decisioni

1. Consultate le fonti ufficiali Qwik Pages e Cloudflare Pages/Wrangler, oltre alle skill locali Cloudflare, Wrangler e Sites (solo flusso locale, stack prescritto).
2. Verificato CLI con `npx --yes create-qwik@latest --help`; generato lo starter `empty` con `npx --yes create-qwik@latest empty .scaffold`. Il CLI riportava una stringa interna `dev`, ma i pacchetti npm installati sono le release stabili Qwik/Qwik City 1.20.4.
3. Copiati soltanto file applicativi/configurazioni dallo starter. La cartella `src` preesistente era vuota. Nessuna nuova inizializzazione Git e nessuna specifica sovrascritta. La rimozione ricorsiva della cartella temporanea è stata rifiutata dal controllo automatico: `.scaffold/` resta locale, ignorata da Git e lint.
4. `npm install`; `npm exec qwik -- add cloudflare-pages` con conferma nel terminale interattivo. Il primo tentativo non interattivo, con flag senza valore, non ha applicato l'integrazione per assenza TTY. Il CLI aggiungeva Wrangler 3: aggiornato a Wrangler 4.162 e configurata la preview sulla build Pages effettiva. Rimosso lo script di deploy generato, dato il perimetro locale.
5. Aggiunti Tailwind 4 con plugin Vite ufficiale, TypeScript 5.9 strict e tool ESLint compatibili. Rimosse dipendenze dello starter inutilizzate (`undici` diretto, plugin CSS modules) e preview generica Node; la preview ufficiale di progetto usa Wrangler Pages.
6. Il primo tentativo con `ssg: null` ha prodotto i bundle ma non gli artefatti Pages: il codice dell'adapter 1.20.4 salta anche il post-build. Corretto con `ssg: { include: [], exclude: ["/*"], maxWorkers: 1, sitemapOutFile: null }`, che mantiene il lifecycle ufficiale senza generare le cinque pagine pubbliche. Rimane solo una 404 ausiliaria. Configurati output Pages, data compatibilità e `nodejs_als` senza account o binding.
7. Realizzati marchio, due illustrazioni SVG originali, tema, header/footer, homepage, quattro pagine iniziali e 404. I contenuti dichiarano il carattere fittizio. Menu e contatti hanno stati esplicativi senza controlli inattivi o invii.
8. Aggiunti metadati Qwik City e canonical solo con origine pubblica configurata. Nessun dominio reale o indirizzo inventato. `useLocation` gestisce la rotta reattiva; navigazione mobile nativa anche senza JS.
9. Creati test Node HTTP per tutte le pagine, metadati, asset, collegamenti, 404 e artefatti SSR. Documentazione di riproduzione e rollback in italiano.

### Comandi e risultati

Ambiente: Windows, Node 22.16.0, npm 10.9.2. I comandi sono da eseguire nella radice del repository.

- Installazione iniziale completata; gli aggiornamenti dei tool hanno richiesto la rigenerazione del lockfile.
- `npm run typecheck`: superato nel primo controllo.
- Primo `npm run lint`: errore nella composizione della configurazione flat Qwik (array espanso come oggetto). Corretto applicando la configurazione per file TypeScript.
- Prima build: exit 0, ma verifica degli artefatti fallita con `ssg: null`. Corretto l'adapter come descritto sopra; build SSR successiva con `_worker.js`, `_routes.json` e moduli `server` presenti.
- Prima esecuzione HTTP sulla porta 8788: fallita (0/8). Il contenuto apparteneva a un altro sito locale già sulla porta; nessun risultato attribuito a questa app. Spostata la preview su 8797 senza toccare il progetto altrui. Test ripetuti: 8/8 sulla build Pages di Osteria del Borgo.
- Primo `npm ci` di riproducibilità con Wrangler aperto: `EPERM` su eseguibile esbuild in uso. Fermati solo i runtime con percorso eseguibile sotto `node_modules` di questa repository; nuova installazione a runtime fermo.
- `npm ci` ripetuto a runtime fermo: exit 0, 446 pacchetti installati. Avvisi di deprecazione upstream e pulizia `EPERM` di due directory opzionali Sharp/WASM; non hanno impedito l'installazione o i controlli successivi. `npm ls --depth=0` mostra i tool previsti e due dipendenze opzionali extraneous (`@emnapi/runtime`, `tslib`).
- `npm run typecheck`: exit 0; include l'adapter, con TypeScript strict.
- `npm run lint`: exit 0, nessun errore o warning nella versione finale. La regola Qwik che suggerisce varianti responsive raster è esclusa soltanto nelle due pagine con SVG originali, con motivazione inline; alt e dimensioni restano espliciti.
- `npm run fmt` e `npm run fmt.check`: completati; configurazioni Vite incluse nel controllo, specifiche originali escluse dai comandi di formattazione.
- `npm run build` finale: exit 0, client e server prodotti; typecheck e lint interni alla build superati. Output: CSS circa 15,70 kB (4,25 kB gzip), moduli client Qwik in `dist/build`, `_worker.js`, `_routes.json` e moduli SSR in `server`. Il messaggio SSG dell'adapter riguarda la sola `404.html` ausiliaria; le cinque pagine pubbliche non hanno `index.html` statici. Nessun sitemap vuoto generato nella configurazione finale.
- `npm run preview`: Wrangler 4.162 compila il worker e ascolta su `http://127.0.0.1:8797` con Workerd locale; nessun login. La URL Pages stampata da Wrangler è una variabile locale simulata, non un deploy avvenuto.
- Durante una ricostruzione con preview già aperta, il watcher ha segnalato transitoriamente `_worker.js` mancante mentre Vite ripuliva `dist`. La preview è stata fermata e riavviata **dopo** l'ultima build, con compilazione worker riuscita; gli otto test sono stati ripetuti sul runtime fresco per evitare di attribuire al nuovo output un bundle rimasto in cache. La procedura di riproduzione documenta il riavvio.
- Il primo tentativo di questo riavvio ha aperto la porta senza rispondere neppure a `/favicon.svg`; cinque test hanno raggiunto il timeout e l'esecuzione è stata interrotta durante il controllo 404, che non aveva ancora un timeout esplicito. Diagnosi con `Get-CimInstance Win32_Process`: più wrapper/processi Node Wrangler di questa repository erano sopravvissuti alla chiusura delle shell e avevano ricreato Workerd dopo la prima pulizia dei soli figli. Fermati prima i Node Wrangler identificati dal percorso di questa repository nella command line, poi gli eseguibili figli sotto il suo `node_modules`. Nessun processo di altri progetti toccato. Aggiunto timeout di 10 secondi anche alla richiesta 404 nei test. Nuova preview con un solo albero Wrangler e un solo listener 8797: compilazione riuscita, **8/8 test superati sul runtime fresco**, circa 0,4 secondi totali.
- `npm test` finale sulla build di produzione in esecuzione: **8/8 superati**, 0 falliti o saltati. HTTP 200 sulle cinque rotte, titoli e description nell'HTML senza script, navigazione e asset validi, HTTP 404 reale e artefatti SSR verificati. Canonical assente senza origine configurata; ramo con origine pubblica configurata disponibile nei test tramite `EXPECTED_CANONICAL_ORIGIN`, ma non eseguito in questa consegna.

### Verifica browser

Usato Playwright MCP contro la build servita da Wrangler, non Vite dev:

- Homepage ispezionata visivamente in screenshot desktop 1440×1000 e mobile 390×844: composizione, marchio, illustrazione, gerarchia del testo, CTA e footer coerenti.
- Larghezze 320, 390, 768, 1024 e 1440: nessun overflow orizzontale; immagini caricate. La larghezza contenuto era inferiore al viewport di 15 px per la scrollbar.
- Skip link raggiunto con Tab: visibile a 10 px dall'alto, outline di 3 px; Invio porta il focus al main `contenuto`.
- Menu mobile aperto con Invio sul summary; Tab attraversa Benvenuti, Storia e Menu con outline di 3 px; Invio su Menu porta a `/menu/` con titolo e `aria-current="page"` corretti.
- Navigazione desktop da tastiera a `/storia/`: titolo, H1 e indicatore attivo corretti dopo navigazione Qwik City. Console della sessione finale senza errori o warning.
- La prima scheda Playwright aveva invii input intermittenti e timeout di click/stabilità; una nuova scheda ha consentito la sequenza da tastiera completa. Un tentativo di creare un nuovo contesto browser con JS disattivato è stato rifiutato dal backend (`Target.createBrowserContext: Not allowed`): non è dichiarato superato. L'indipendenza dal JS del client è invece verificata con richieste HTTP e analisi dell'HTML. Nessun audit WCAG completo, test screen reader, Safari o Lighthouse eseguito.

Per riprodurre il controllo manuale: avviare preview, aprire homepage a 390 px, premere Tab/Invio per lo skip link, focalizzare Esplora e premere Invio, quindi Tab fino a Menu e Invio. Ripetere su desktop con la navigazione principale. Per il rendering senza JS usare `npm test` e le richieste `curl.exe` documentate in `DEPLOYMENT.md`.

### Consegna Git

Il commit `2f7b7c5` include applicazione, configurazioni, lockfile, verifiche e documentazione della milestone. Un secondo commit limita anche la richiesta 404 con un timeout e registra il riavvio finale del runtime, la gestione dei processi orfani e la procedura per evitare il bundle precedente durante una rebuild. Signing disattivato soltanto per ciascun comando `git -c commit.gpgsign=false commit`. Push limitato a `feature/mvp-foundation`, senza merge/rebase o modifiche a `develop`, `preview`, `master`. Conferma del push nel resoconto di consegna; `git log --oneline develop..HEAD` permette di recuperare i commit senza dipendere dalla chat. Gli artefatti locali, screenshot, `.scaffold`, dipendenze e stato Wrangler sono ignorati e non fanno parte dei commit.

### Dipendenze: limite noto

`npm audit` dopo gli aggiornamenti segnala 12 pacchetti interessati: 8 moderate e 4 high. Catene: `minimatch` tramite TypeScript ESLint/plugin Qwik; `sharp` tramite `vite-imagetools`/Qwik City; `zod` tramite Qwik City. Non applicato `npm audit fix --force`, che propone anche downgrade incompatibili del framework. Non sono implementati upload, trasformazioni di immagini dell'utente o validazione di input business; ciò non rende l'audit superato. Tutte le dipendenze sono di build secondo lo starter, ma una classificazione devDependency non esclude da sola l'inclusione di codice nel bundle server. Rivalutare gli aggiornamenti upstream prima di una pubblicazione.

### Prossimo task

Completare i contenuti delle pagine nella milestone successiva dopo richiesta del proprietario. Non avviare automaticamente dataset del menu, filtri, deploy o promozione dei branch.

## 2026-11-15 — Milestone 2: identità gastronomica e contenuti

### Perimetro e verifiche preliminari

Proseguito su `feature/mvp-foundation` esistente, come richiesto esplicitamente. Working tree inizialmente pulito, HEAD `35e1c1d`; dopo `git fetch origin`, `git rev-list --left-right --count HEAD...origin/feature/mvp-foundation` restituisce `0 0`. Letti specifiche e documentazione della foundation. Nessun subagente, worktree, merge, rebase o nuova inizializzazione. `AGENTS.md` e `docs/MVP.md` preservati.

### Modifiche e motivazioni tecniche

1. Palette richiesta pomodoro `#A93427`, panna `#FFF0D2`, basilico `#356348`, inchiostro `#29251F`. Titoli Fraunces 800, corpo di sistema. Un solo WOFF2 latino da 18.224 byte, locale, con OFL inclusa, preload e `font-display: swap`. Nessuna dipendenza applicativa aggiunta.
2. Hero centrale espressiva, timbro, etichetta, pomodoro inciso originale, foto di pranzo condiviso, fascia statica e menu tipografico. Niente carousel o animazioni continue. Decisioni, ruoli, voce e contrasti in `BRAND_DIRECTION.md`.
3. Due immagini create con Imagegen integrato, ispezionate e dichiarate generate: pranzo e sala immaginari. Quattro derivati WebP locali: pranzo 720/1440 px (88.354/281.682 byte), sala 960/1440 px (116.120/224.268 byte). Sharp già presente è stato usato solo per ricodifica/ridimensionamento. Prompt completi, provenienza e riproduzione in `ASSETS.md`; i derivati finali sono versionati e la build non usa AI.
4. Creati manifesto `public/images/a-tavola.svg`, favicon e componente `BorgoMark`. Conservate senza modifiche le due illustrazioni della foundation, ora non usate dalla composizione.
5. Completati testi e metadati delle cinque rotte: proposta conviviale, narrativa esplicitamente fittizia, principi, menu editoriale, ambiente e FAQ. Nessun indirizzo, orario operativo, premio o recensione inventato come reale; nessun modulo o invio.
6. Sei assaggi statici in `src/content/menu-preview.ts`, condivisi fra home e menu tramite `MenuList`, con descrizioni, prezzi indicativi e allergeni demo. Tre ancore alle portate, nessun filtro o pulsante inattivo. Informazioni alimentari chiaramente non utilizzabili come garanzia. Questo campione prepara la grafica, non completa il catalogo di almeno dodici piatti della futura milestone interattiva.
7. Preservati Qwik City, TypeScript strict, routing, entry SSR e adapter Pages. Aggiornati README, architettura, case study, deployment, crediti e formattazione. Nessun servizio o backend nuovo, nessun deploy o modifica di account/DNS/Access/pipeline.

### Comandi e verifiche effettive

- `npm install`: exit 0; risoluzioni versionate conservate, due pacchetti opzionali riallineati localmente. Nessun cambiamento del lockfile. Restano le 12 segnalazioni audit upstream della foundation (8 moderate, 4 high), senza upgrade forzati fuori scope.
- Primo typecheck: proprietà JSX `srcSet` non ammessa; corretta in `srcset` secondo i tipi HTML Qwik.
- `npm run typecheck` e `npm run lint` dopo la correzione: exit 0, nessun warning lint.
- `npm run fmt` e `npm run fmt.check`: completati; specifiche originali escluse, nuovo documento di marca incluso.
- `npm run build`: exit 0, client e server prodotti; controlli interni lint/types superati. CSS client 24,04 kB (5,88 kB gzip). Solo la 404 ausiliaria viene generata staticamente; le cinque pagine pubbliche restano SSR.
- Avviso Vite della fase server: URL `/fonts/fraunces-latin-800.woff2` lasciato per risoluzione runtime, perché l'adapter server non usa `publicDir`. Non è un errore bloccante: il test HTTP verifica realmente il font pubblicato, magic `wOF2` e dimensione corretta.

Per la verifica usata la porta 8798, lasciando intatto il listener preesistente sulla 8797. Sintassi controllata con l'help del Wrangler locale; skill Wrangler applicata al runtime esistente, senza modificare configurazioni.

```powershell
node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port 8798 --inspector-port 0
# Secondo terminale nella stessa radice:
$env:SSR_BASE_URL = 'http://127.0.0.1:8798'
npm test
```

Wrangler 4.162 compila il worker e avvia Workerd locale, senza login. **10/10 test superati**, 0 falliti/saltati: contenuto e metadati nell'HTML diretto di tutte le rotte dopo rimozione degli script, link/asset, 404 reale, ancore e allergeni demo, assenza di filtri/form, font locale e artefatti SSR senza pagine pubbliche prerenderizzate. Nessun test attribuito a filtri o prenotazioni non implementati.

### Verifica browser e visiva

Playwright MCP sulla build Pages: tutte le cinque pagine a 320, 390, 768 e 1440 px, **20 combinazioni senza overflow orizzontale**, un H1 e Fraunces caricato. Ispezionati screenshot di home desktop/mobile, menu desktop, contatti mobile e galleria desktop. Contenitori mobile verificati anche con bounding box: 16 px per lato del contenuto disponibile a 390 px.

Verificati da tastiera: skip link al main; apertura del menu mobile con Invio; Tab su Benvenuti/Storia/Menu con focus di 3 px; navigazione al menu e voce attiva corretta; ancora `#dolci` con sezione raggiunta in alto; apertura della FAQ sulle prenotazioni con focus di 3 px. Console finale senza errori o warning. Il browser del computer inietta script dell'antivirus, non introdotti dall'app e non modificati.

Contrasti sRGB principali: pomodoro/panna 5,81:1, basilico/panna 6,15:1, inchiostro/panna 13,52:1. Non eseguiti audit WCAG completo, screen reader, Safari, Lighthouse o misure in produzione. Canonical con origine pubblica configurata non esercitato in questa milestone; resta facoltativo come nella foundation.

### Consegna e prossimo task

Commit atomico della milestone, signing disattivato solo nel singolo comando `git -c commit.gpgsign=false commit`, push sul solo branch di lavoro. Hash e conferma nel resoconto finale e recuperabili con `git log -1 --oneline`. Artefatti e screenshot esclusi dai commit; preview avviata dalla sessione chiusa al termine senza toccare il listener preesistente. Nessuna modifica ai branch di integrazione, staging o produzione.

Prossimo task, solo dopo nuova richiesta: catalogo completo, filtri combinabili, reset e stati del menu interattivo. Nessun avvio automatico o deployment.
