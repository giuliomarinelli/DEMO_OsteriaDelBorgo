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

## 2026-11-15 — Milestone 3: menu digitale interattivo

### Perimetro e stato iniziale

Letti `AGENTS.md`, `docs/MVP.md` e documentazione esistente. Working tree pulito su `feature/mvp-foundation`, HEAD `dedb43e`; `git fetch origin` e confronto con `origin/feature/mvp-foundation`: `0 0`. Proseguito sul branch esistente, senza creare branch, worktree o subagenti. Specifiche conservate, nessun merge/rebase/deploy o modifica a account, DNS, Access, pipeline o fatturazione.

### Modifiche e ragioni delle scelte

1. Sostituito il campione `src/content/menu-preview.ts` con `src/content/menu.ts`: 18 piatti fittizi (4 antipasti, 4 primi, 4 secondi, 3 contorni, 3 dolci), ID, descrizioni, prezzi e array di allergeni tipizzati. Mappa di 12 etichette condivisa fra controlli, righe e legenda. Home alimentata dagli stessi tre ID della milestone 2, senza duplicazione dei contenuti.
2. `src/lib/menu-filters.ts`: funzione pura, categoria AND esclusioni, corrispondenza OR fra allergeni esclusi. Nessuna mutazione degli input, ordine invariato. Stato iniziale creato per istanza/richiesta, senza oggetti globali mutabili o persistenza.
3. Rotta menu con `useStore`, `useComputed$` e handler QRL: radio nativi per una portata o tutte, checkbox per esclusioni multiple, conteggio live, sezioni con risultati, stato vuoto e reset. Nessun backend, fetch, servizio, database, autenticazione o invio. Ogni modifica sostituisce l'array delle esclusioni per rendere esplicito l'aggiornamento reattivo.
4. Campi raggruppati con `fieldset/legend`, istruzioni associate, etichette cliccabili almeno 44 px, selezione nativa e cromatica, focus di 3 px. Il conteggio usa `role="status"`, `aria-live="polite"` e `aria-atomic`; un'ancora raggiunge la regione nominata dei risultati. Nessuno spostamento automatico del focus durante la selezione.
5. Allergeni sempre espliciti sotto ogni piatto mostrato, avvertenza sopra i filtri e legenda anche nello stato vuoto. «Nessuno indicato» non prova assenza reale o sicurezza. Dati e prezzi fittizi, esclusioni senza garanzie alimentari né verifica di contaminazioni; nessun uso decisionale per un pasto reale.
6. Conservati palette, Fraunces, bordi e menu tipografico. Unica immagine aggiunta alla presentazione dei piatti: riuso del WebP 720×480 già documentato per le tagliatelle, con didascalia/alt dichiarati generati e lazy loading. Nessun nuovo asset, download o generazione. Gli altri piatti non ricevono immagini generiche non pertinenti.
7. Test Node sulla logica TypeScript effettiva tramite type stripping nativo; `npm test` combina 19 unitari e 10 HTTP SSR. Aggiunto soltanto `axe-core` 4.14.0 come devDependency, con lockfile: caricato dalla sessione di QA, mai importato nell'applicazione. La configurazione Prettier ignorava qualsiasi directory `lib`: ancorata la sola esclusione `/lib` alla radice per includere anche il nuovo `src/lib` nella formattazione.
8. Aggiornati README, ARCHITECTURE, CASE_STUDY, DEPLOYMENT, BRAND_DIRECTION e ASSETS, oltre a questo worklog. Rendering SSR, routing e adapter Pages preservati; nessuna modifica alle loro configurazioni.

### Difetti rilevati e corretti

- Primo lint: direttiva Qwik `jsx-img` non necessaria nel componente con sorgente dinamica. Rimossa; versione finale senza warning lint.
- Fallback iniziale con `style` dentro `noscript`: dopo la ripresa Qwik e un aggiornamento DOM il CSS nascondeva anche i controlli con JS attivo. Spostata la regola nel CSS globale con `@media (scripting: none)`; `noscript` contiene soltanto la spiegazione. Verificato `display: block` dei filtri dopo selezioni/reset e aggiunta guardia SSR contro lo style nel fallback. Nei browser senza supporto alla media query i controlli possono restare visibili senza JS; il catalogo completo e la spiegazione rimangono disponibili.
- Primo raggruppamento in un secondo computed: contatore 9 ma 15 righe ancora renderizzate dopo l'esclusione del latte. Eliminati gli oggetti intermedi, ricavate le sezioni direttamente da `results.value` nel render; `MenuList` legge le props reattive. Controllo successivo su ID reali, non soltanto sul testo del contatore: 9 righe corrette, una con categoria primi, zero aggiungendo grano, 18 al reset.
- Axe ha richiesto un ruolo alla regione dei risultati con `aria-label`: aggiunto `role="region"`. Ha inoltre rilevato «Osteriadel Borgo» come testo del marchio rispetto al nome accessibile: aggiunto lo spazio fra i due elementi tipografici, senza cambiare la composizione. Scansione finale senza violazioni rilevate.

### Installazione e verifiche tecniche effettive

Ambiente Windows, Node 22.16.0, npm 10.9.2. Dalla radice:

```powershell
npm install
npm install --save-dev --save-exact axe-core@4.14.0
npm run typecheck
npm run lint
npm run fmt
npm run fmt.check
npm run build
# Avviare soltanto dopo la conclusione della build:
node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port 8798 --inspector-port 0
# Secondo terminale nella medesima radice:
$env:SSR_BASE_URL = 'http://127.0.0.1:8798'
npm test
```

- Installazioni: exit 0; aggiunta devDependency axe-core, nessun upgrade del framework. Avviso di pulizia `EPERM` su directory opzionali Sharp/WASM, senza bloccare installazione o verifiche. `npm audit --json` finale conferma 12 segnalazioni preesistenti (8 moderate, 4 high), nessuna critical. Nessun `audit fix --force`: rimane il limite upstream della foundation.
- `npm run typecheck`: exit 0, TypeScript strict. `npm run lint`: exit 0, nessun errore/warning finale. `npm run fmt.check`: superato, include il modulo dei filtri dopo la correzione dell'esclusione.
- `npm run build` finale: exit 0; 81 moduli client e 41 SSR trasformati, CSS 26,87 kB / 6,43 kB gzip. Prodotti bundle client, moduli `server`, `_worker.js` e `_routes.json`. Solo `404.html` ausiliaria generata staticamente; nessun `index.html` pubblico prerenderizzato.
- Avvisi non bloccanti: `NO_COLOR`/`FORCE_COLOR` dell'ambiente e URL WOFF2 lasciato da Vite per risoluzione runtime nella fase server, già presente in milestone 2. Il test HTTP conferma che il font viene effettivamente servito come WOFF2.
- Preview fermata prima di ogni rebuild e riavviata a build conclusa. Terminati soltanto wrapper/CLI Wrangler della porta 8798 identificati tramite PID e percorso della repository, poi i loro figli sotto il relativo `node_modules`, per evitare la ricreazione di Workerd. Nessun processo di altri progetti toccato. La URL Pages stampata è una variabile locale simulata, non un deployment.
- `npm test` finale sul runtime fresco: **29/29 superati, 0 falliti o saltati**. 19 unitari: cinque categorie, nessun filtro, esclusione singola/multipla, combinazioni, vuoto, allergene assente, catalogo vuoto, duplicati, input congelati non mutati, reset indipendente, integrità e selezione home. 10 SSR: cinque richieste HTTP dirette, metadati/layout/contenuto dopo rimozione script, link/asset, 404, catalogo completo con 18 informazioni allergeni e controlli, font e artefatti. L'avviso sperimentale di type stripping su Node 22.16 è atteso; non è un test saltato.
- Homepage e `/menu/`, oltre alle altre tre pagine, contengono contenuto significativo e metadati nell'HTML della build Pages senza dipendere dal JS client. Canonical con origine configurata non esercitato; senza origine il test conferma l'assenza di un dominio inventato.

### Browser, tastiera e accessibilità

Playwright MCP sul runtime Pages/Workerd, non Vite dev. Controllati numero e ID delle righe realmente renderizzate dopo interazioni native, insieme a selezioni e messaggi:

| Selezione                            | Righe e conteggio osservati                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| Tutte, nessuna esclusione            | 18                                                                                           |
| Tutte, esclusione latte              | 9: caponata, crostino ceci, spaghetti, pollo, baccalà, polpettone, patate, cicoria, finocchi |
| Primi, nessuna esclusione            | 4                                                                                            |
| Primi, esclusione latte              | 1: spaghetti alle vongole                                                                    |
| Primi, esclusioni latte e grano      | 0, «Qui il piatto è vuoto», avvertenza e legenda presenti                                    |
| Reset principale o dallo stato vuoto | 18, radio Tutte selezionato, nessun checkbox selezionato, reset principale disabilitato      |

Usati Space sui controlli, frecce nel gruppo radio, Tab fra checkbox e Invio sui reset. Outline verificato di 3 px; controlli ancora visibili dopo aggiornamenti. Non verificata una lettura screen reader: l'annuncio live è controllato a livello di semantica DOM.

Menu a 320, 390, 768 e 1440 px: nessun overflow orizzontale, etichette almeno 44 px e testo interno senza overflow; nessuna immagine completata con errore. Ispezionati screenshot del pannello desktop e mobile: titoli, griglie, controlli e bordi mantengono l'identità. Il browser di automazione ha avuto timeout intermittenti su screenshot, actionability e `waitForFunction`, e un viewport azzerato dal backend: quei tentativi non sono conteggiati come successi. Le verifiche riportate sono quelle riuscite con azioni native e letture DOM in chiamate separate; viewport e screenshot ricontrollati dopo ripristino. Nessuna installazione di browser o uso di input nativo del sistema in sostituzione di Playwright.

Axe-core 4.14.0, tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`: **0 violazioni rilevate** sul menu completo finale (26 regole passate) e stato vuoto (23). Resta `color-contrast` da rivedere manualmente per frecce decorative: la freccia del collegamento ai risultati è `aria-hidden`, pomodoro su panna (5,81:1); i reset usano gli stessi token ad alto contrasto. La segnalazione incomplete non è soppressa né dichiarata un pass automatico. I rapporti principali restano quelli documentati in BRAND_DIRECTION. Nessuna certificazione WCAG, audit completo, screen reader, Safari, Lighthouse o misurazione in produzione dichiarata.

Per riprodurre manualmente senza strumenti agente:

1. Avviare la preview e aprire `/menu/`; verificare i 18 piatti anche con `curl.exe -sS http://127.0.0.1:8798/menu/`. La risposta deve contenere nomi, descrizioni, allergeni, title e description.
2. Da tastiera raggiungere i radio e usare frecce/Space; raggiungere Latte e poi Grano con Tab/Space. Ripetere le combinazioni della tabella e contare anche le righe, non solo il riepilogo. Provare entrambi i reset, focus visibile e collegamento ai risultati. Ridimensionare la finestra alle quattro larghezze indicate.
3. Per axe aprire `node_modules/axe-core/axe.min.js` in un editor, copiarne il contenuto nella console DevTools della sola preview locale ed eseguirlo. Il file installato e versionato nel lockfile evita CDN o nuovi servizi. Eseguire poi:

```javascript
const report = await axe.run(document, {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
});
console.log(report.violations, report.incomplete, report.passes.length);
```

Ripetere prima e dopo una combinazione senza risultati. L'iniezione è solo QA e scompare ricaricando la pagina; non va aggiunta al codice applicativo. Per una verifica alimentare reale questa demo non è utilizzabile.

### Consegna e limiti

Commit della funzionalità con dati, test e documentazione coerenti; signing disattivato solo con `git -c commit.gpgsign=false commit`. Push limitato a `feature/mvp-foundation`. Hash e conferma nel resoconto finale, ricostruibili con `git log --oneline dedb43e..HEAD`. Nessun artefatto, screenshot, dipendenza installata, stato Wrangler o secret nei commit. Preview della sessione fermata al termine.

Residui: audit upstream, limiti delle verifiche di accessibilità/browser sopra descritti e dati alimentari esclusivamente dimostrativi. Nessun blocco della funzionalità richiesta. Prossimo task soltanto su nuova richiesta: eventuali rifiniture della milestone 4; non avviate automaticamente prenotazioni, promozioni fra branch o pubblicazioni.

## 2026-11-15 — Milestone 4A: collaudo visuale e funzionale

### Perimetro e riferimento

Letti integralmente regole, MVP, direzione artistica e worklog. Branch `feature/mvp-foundation`, working tree inizialmente pulito, HEAD `00d76b3f1b2b6a0ad5d0090937e3833513e97c30`. `git fetch origin feature/mvp-foundation` e confronto HEAD/remoto: `0 0`. Nessun nuovo branch, subagente, worktree, merge, rebase o modifica alle specifiche. Nessun login, deploy, servizio Cloudflare, DNS, account, Access, secret, pipeline o fatturazione modificato.

Obiettivo: collaudare l'app esistente, registrare evidenze e audit editoriale, correggendo solo difetti circoscritti confermati. Nessun difetto applicativo riproducibile confermato nelle prove riuscite: codice in `src` e configurazioni SSR/Pages lasciati invariati. Due test aggiunti e documentazione aggiornata; nessuna nuova funzionalità o restyling. Skill Wrangler usata con versione locale e help effettivo; consultata la [documentazione Pages locale](https://developers.cloudflare.com/pages/functions/local-development/).

### Comandi e risultati tecnici

Windows, Node 22.16.0 e npm 10.9.2, dalla radice:

```powershell
npm ci
node node_modules/wrangler/bin/wrangler.js pages dev --help
npm run typecheck
npm run lint
npm run build
node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port 8798 --inspector-port 0
# Seconda shell nella stessa radice:
$env:SSR_BASE_URL = 'http://127.0.0.1:8798'
npm test
```

- `npm ci`: exit 0, 447 pacchetti aggiunti, 454 analizzati; lockfile invariato. Avvisi di deprecazione upstream per inflight, glob, tsconfck ed ESLint 9.39.5. Nessun aggiornamento di dipendenze applicato.
- Typecheck e lint: exit 0; lint senza warning anche dopo i due nuovi test. TypeScript strict e regole Qwik conservati.
- Build: exit 0; 81 moduli client, 41 SSR, CSS 26,89 kB / 6,44 kB gzip. Artefatti client/server e `_worker.js`/`_routes.json` generati. Solo 404 ausiliaria statica, nessun `index.html` delle pagine pubbliche. Avvisi già noti sulla risoluzione runtime del font nel build server e `NO_COLOR`/`FORCE_COLOR`, senza errore di build. Font realmente servito e validato dal test WOFF2.
- Wrangler 4.162.0/Workerd locale fresco sulla porta 8798, libera all'inizio, senza login. Nessun binding business o remoto. L'URL Pages stampato è una variabile locale simulata, non un deployment.
- Prima suite: 29/29 passati sul runtime di produzione. Aggiunti poi due test sul dataset effettivo: sequenza latte → primi → grano → deselezione del latte → stato iniziale; tutte le 12 esclusioni, sia su tutte le portate sia su ognuna. Si verificano ID attesi espliciti e non soltanto il numero prodotto dalla funzione.
- Suite finale dopo questi nuovi casi: **31/31 passati**, 21 unitari e 10 HTTP SSR, 0 falliti/saltati. Avviso sperimentale del type stripping Node atteso. I test unitari non simulano il browser e non dimostrano aggiornamento DOM, tastiera o reset dei controlli visivi.
- I dieci test HTTP confermano HTML significativo e metadati sulle cinque richieste dirette, link/asset, 404 reale, catalogo e allergeni presenti nell'HTML iniziale, font e artefatti. Nessun JS client eseguito da questi test. Canonical con origine configurata non esercitato; senza origine confermata l'assenza di dominio inventato.
- Formattazione eseguita e verificata; i relativi script includono anche CONTENT_AUDIT, QA_MANUAL e documenti/JSON delle evidenze. Nessuna modifica dei file di specifica tramite formatter.

### Browser: evidenza riuscita e blocco

Playwright MCP disponibile inizialmente: aperta una sola scheda QA sulla preview locale e acquisito lo [screenshot home 1440×1000](evidence/milestone-4a/home-1440.png), poi letto il file per l'ispezione visuale. Header, marchio, titoli, CTA, margini e inizio foto risultano coerenti con la direzione artistica e senza tagli nella vista acquisita. Questo non copre il resto della home o l'intera applicazione.

Il primo script preparatorio tentava un import Node nel contesto isolato del tool, rifiutato con `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`: errore del codice di QA, non dell'app. Rimosso quell'import, il primo controllo della matrice (home/storia con attesa font/immagini) è rimasto in esecuzione senza restituire un report, oltre il primo yield di 30 secondi. Interrotta la cella in attesa; causa del blocco non isolata, quindi non attribuita al sito. **Nessun ulteriore tentativo browser**, riavvio del driver, nuova scheda di aggiramento o sostituzione con input di sistema, come richiesto. La scheda QA può restare aperta; non è attestato il completamento della chiamata browser interrotta.

Non si considerano riusciti la matrice 20 combinazioni, la verifica interattiva reale, i nuovi test da tastiera, una nuova scansione axe, gli screenshot mobile o interni. I pass della milestone 3 rimangono storici. La nuova vista desktop è versionata; hash, dimensione e ambito sono nel [manifest delle evidenze](evidence/milestone-4a/README.md). Non sono usate immagini storiche per simulare nuove prove.

Preparato [QA_MANUAL.md](QA_MANUAL.md): avvio riproducibile, matrice cinque pagine × 1440/768/390/320, scorrimento completo, immagini, spaziature, gerarchie, navigazione, tastiera, stato vuoto, entrambe le azioni di reset, deselezione, tutte le esclusioni e ID attesi, controlli senza JS e criteri per documentare difetti. Le celle sono marcate da eseguire, con sola home desktop iniziale parziale. I test di logica verificano i valori attesi di quella checklist, senza trasformarli in esiti UI.

### Contrasto e lettura del sorgente

Ricalcolati in Node i rapporti sRGB dei token: pomodoro/panna 5,81:1, basilico/panna 6,15:1, inchiostro/panna 13,52:1, pomodoro/carta secondaria 5,02:1 e testo reset disabilitato/panna 7,02:1. Sono rapporti fra colori senza trasparenze o sovrapposizioni, non una nuova verifica di tutti i pixel dell'interfaccia. I valori coprono anche i token della freccia decorativa segnalata come incomplete in milestone 3; quella segnalazione non viene dichiarata risolta da un controllo visuale non eseguito.

Nel CSS e markup sono presenti focus, controlli nativi, etichette e dichiarazioni demo; non è equivalente a una prova da tastiera. Le didascalie e le etichette minori arrivano a 9–11 px su mobile: la leggibilità con zoom e dispositivi reali resta da verificare, senza aumentare font o cambiare composizioni sulla base del solo sospetto. Nessun audit WCAG completo, screen reader, Safari, Lighthouse o prestazione in produzione dichiarati.

### Dipendenze: rilevanza effettiva dell'audit

`npm audit --json` conferma **12 pacchetti segnalati: 8 moderate, 4 high, 0 critical**. Sono pacchetti coinvolti anche per propagazione transitiva, non dodici vulnerabilità indipendenti. Analizzati `via`, `nodes` ed `effects`, `npm explain minimatch sharp zod`, import del sorgente e bundle client/SSR; [snapshot JSON](evidence/milestone-4a/dependency-review.json) versionato. Nessun payload di sfruttamento eseguito.

| Catena e versione installata                                              | Rilevanza per questo progetto e limite residuo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TypeScript ESLint / plugin Qwik → minimatch **10.2.6**, moderate          | L'[advisory sulla crescita dei pattern](https://github.com/advisories/GHSA-g3hv-75wg-m249) riguarda consumo di risorse da pattern controllabili. Qui la catena opera nel lint/configurazione locale, senza pattern ricevuti da HTTP. Non emergono import o marker nel runtime prodotto. Rischio principalmente della toolchain con input/configurazioni non affidabili; non chiuso solo perché devDependency. La copia 3.1.5 di altre catene non è il nodo segnalato da questo advisory.                                                                                                                                                                                       |
| Qwik City **1.20.4** → vite-imagetools **9.0.3** → Sharp **0.34.5**, high | Advisory su dipendenze native [libvips](https://github.com/advisories/GHSA-f88m-g3jw-g9cj), [libheif](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) e [librsvg](https://github.com/advisories/GHSA-wq5f-xc86-pv6w). La toolchain immagini rimane installata sul sistema di sviluppo/build. Questa app usa asset locali versionati, senza upload o endpoint di trasformazione; il bundle Pages non importa Sharp o moduli nativi. Rischio da rivalutare se si elaborano file non affidabili o si cambia pipeline. La distinta copia Sharp **0.35.5** dentro Miniflare non è il nodo vulnerabile indicato dall'audit corrente; non basta ad aggiornare quella di Qwik City. |
| Qwik City **1.20.4** → Zod **3.25.48**, high                              | L'[advisory sul consumo di memoria nella validazione](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) include questa versione secondo npm audit. Il modulo generale Qwik City importa/riesporta API Zod, quindi la sola categoria devDependency non dimostra l'esclusione. L'app non usa routeAction, routeLoader, zodSchema o validatori business; il bundle effettivo non presenta import esterni Zod o i marker cercati. Nessuna via di validazione di collezioni fornita dall'utente individuata nel perimetro attuale. Rivalutare se si aggiungono action/form/validatori.                                                                                             |

Controllo statico aggiuntivo con esbuild già installato: il worker prodotto si risolve in sette file locali generati, unico import esterno `node:async_hooks`; nessun modulo sotto `node_modules` richiesto dall'output. Cercati nel bundle SSR risultante e nei 47 moduli client i marker `minimatch`, `firstPhasePreProcess`, `globParts`, `sharp`, `vite-imagetools`, `ZodError`, `ZodArray`, `safeParseAsync`, `zod`, senza corrispondenze. L'assenza di stringhe non è una prova formale di assenza di codice minificato: combinata con grafo e sorgente limita la via di esposizione individuata per **questa** build. Audit resta aperto; nessuna garanzia generale di non sfruttabilità.

Per riprodurre l'ispezione dalla radice, a build conclusa:

```powershell
New-Item -ItemType Directory -Force -Path artifacts/milestone-4a/review | Out-Null
npm audit --json | Out-File -LiteralPath artifacts/milestone-4a/npm-audit.json -Encoding utf8
npm explain minimatch sharp zod
node node_modules/esbuild/bin/esbuild dist/_worker.js --bundle --platform=neutral --format=esm '--external:node:*' '--external:cloudflare:*' --metafile=artifacts/milestone-4a/review/metafile.json --outfile=artifacts/milestone-4a/review/worker.js
$bundleMeta = Get-Content -Raw artifacts/milestone-4a/review/metafile.json | ConvertFrom-Json
$bundleMeta.inputs.PSObject.Properties.Name
$bundleMeta.outputs.PSObject.Properties.Value.imports
rg -n 'minimatch|firstPhasePreProcess|globParts|sharp|vite-imagetools|ZodError|ZodArray|safeParseAsync|zod' artifacts/milestone-4a/review/worker.js dist/build
rg -n 'routeAction|globalAction|routeLoader|zod|validator|sharp|imagetools' src adapters vite.config.ts
```

`npm audit` esce con codice non zero quando trova segnalazioni; `rg` con codice 1 indica nessuna corrispondenza. Il primo tentativo tramite `npm exec` ha inoltrato male i flag nel terminale Windows e non ha prodotto l'analisi: usato poi l'ingresso Node locale sopra, verificato con successo. Nessuna modifica del bundle servito: l'output di ispezione è separato e ignorato da Git. I nomi hash dei chunk possono cambiare in altre build.

Non eseguiti `npm audit fix`, override o aggiornamenti forzati. Le soluzioni automatiche proposte includono downgrade incompatibili di Qwik City a 0.0.128 e altri tool; non sono una procedura di rimedio accettata. Un futuro aggiornamento compatibile richiede decisione e collaudo dedicati. Il problema non è dichiarato irrilevante né risolto per il solo fatto di non avere un backend business.

### Audit editoriale e consegna

Creato [CONTENT_AUDIT.md](CONTENT_AUDIT.md) con valutazione di home, storia, menu, galleria, contatti e 404; rilevati soprattutto ripetizione dei temi conviviali, pochi contenuti esclusivi nella galleria e opportunità di dettaglio nella storia. CTA al menu molto ripetute ma funzionanti; nessuna modifica pubblica per preferenze non misurate. Nessuna pagina placeholder individuata dall'esame dei contenuti. Valutazione distinta dal collaudo visuale non completato.

README, ARCHITECTURE, DEPLOYMENT e CASE_STUDY aggiornati a 21 unitari + 10 SSR e al limite attuale, mantenendo i risultati storici. Screenshot e JSON sono evidenze di QA versionate, non nuovi asset del sito. Configurazioni, dipendenze risolte e codice applicativo preservati. Fermata soltanto la preview Wrangler avviata dalla sessione, verificando percorso e PID del CLI e dei figli.

Commit e push sul solo `feature/mvp-foundation`, signing disattivato per ogni singolo comando di commit. Hash nel resoconto finale e recuperabile con `git log --oneline 00d76b3..HEAD`. Nessuna credenziale o artefatto di build nei commit. **Accettazione visuale/interattiva 4A ancora parziale**: completare la checklist manuale prima di dichiararla superata. Nessuna nuova funzionalità, promozione o milestone successiva avviata.

## 2026-11-15 — Ripresa del collaudo 4A su nuova richiesta Playwright

### Autorizzazione e base

Il proprietario ha richiesto esplicitamente di riprendere il collaudo con una nuova chiamata Playwright MCP. Ripartito da `cad3b09` su `feature/mvp-foundation`, working tree pulito; fetch del solo branch e confronto con origin `0 0`. Letti specifiche, direzione artistica, checklist e worklog; nessuna modifica ad AGENTS o MVP. Riutilizzate le dipendenze installate con `npm ci` nella precedente esecuzione 4A, lockfile invariato; nessuna nuova installazione o risoluzione. Il nuovo tentativo non converte in successi i precedenti controlli interrotti.

### Prove riuscite e copertura

1. Nuova richiesta `browser_tabs`: browser rispondente. Riavviata soltanto la preview di questa repository su 8798, libera, usando la build Pages esistente. Navigazione HTTP diretta, non Vite dev.
2. Cinque pagine × 1440/768/390/320 px: **20 misure DOM completate**, con un solo H1, font in stato loaded, `scrollWidth === clientWidth` e nessun elemento fra titoli, paragrafi, pulsanti e immagini selezionati fuori dal viewport. Report versionato in `viewport-matrix-resume.json`. Misure iniziali, non prova delle interazioni o caricamento di tutte le immagini lazy.
3. Acquisite ed esaminate quattro catture complete per home, storia e menu; la galleria desktop è stata acquisita prima che comparisse il manifesto lazy. Sono 13 file full-page, di cui 12 utilizzabili per la lettura completa delle prime tre pagine. Foto, descrizioni, prezzi, allergeni, spaziature, ritorni a capo e gerarchie controllati nelle catture. Nessuna revisione generale del design.
4. La cattura successiva della galleria a 768 px è scaduta dopo 5 secondi nella routine screenshot. Non è stata ripetuta. Una lettura DOM indipendente ha risposto e mostrato tutte e tre le immagini caricate a quel viewport, incluso `a-tavola.svg`; il manifesto inizialmente incompleto non è stato classificato come asset mancante.
5. Tentativo Space sul checkbox Latte: nella lettura successiva risultavano ancora 18 piatti e nessuna esclusione. Un controllo con `locator.check`, portando la pagina in primo piano, è scaduto dopo 3 secondi nell'attesa di elemento visibile/abilitato/stabile. Interrotti i tentativi di input, senza click forzati, manipolazione di checkbox o eventi sintetici per ottenere un risultato. Non è stato isolato un difetto Qwik dei filtri: nessun nuovo pass di interazione, reset o tastiera dichiarato.
6. Dopo la nuova build descritta sotto, letture DOM e screenshot mirato hanno verificato la correzione. Sono inoltre riuscite due catture indipendenti non tentate prima: galleria 320 (tre immagini caricate dopo scorrimento) e contatti 390 (stato iniziale con prima FAQ già aperta). File esaminati e versionati. Non è stata ritentata la cattura galleria 768 fallita.
7. Axe-core 4.14.0 sulle cinque pagine iniziali a 390×844, tag WCAG 2 A/AA e 2.1 A/AA: **0 violazioni rilevate**, 20/17/27/18/17 regole passate rispettivamente home/storia/menu/galleria/contatti. Report `axe-resume.json`. `color-contrast` incomplete per simbolo decorativo del menu mobile e freccia dei risultati sul menu; conservati senza soppressione, non pass automatici. Console dell'ultima navigazione: 0 errori e 0 warning. Nessuna prova screen reader, Safari, zoom 200%, menu vuoto o conformità WCAG completa.

La copertura visuale è ora più ampia del primo tentativo, ma restano aperti viewport della galleria/contatti non acquisiti, stati filtrati/vuoti, navigazione da tastiera, FAQ azionate e altre verifiche elencate in QA_MANUAL. Le misure DOM su 20 combinazioni non sono presentate come 20 collaudi visuali/interattivi completi.

### Difetto riproducibile e correzione circoscritta

Home a 320 px: il titolo va su tre righe e il pomodoro decorativo assoluto copre l'inizio di «a tavola». Confermato con screenshot e rettangoli DOM: pomodoro x 13,95–69,05 / y 302,18–354,79; testo x 35,82–269,18 / y 280,48–354,98. Non causa overflow, ma sovrappone contenuto essenziale: il solo controllo `scrollWidth` non lo rileva.

In `src/global.css` aggiunta una sola media query `max-width: 360px` che nasconde `.hero-tomato`. Marchio nell'header, testi, dimensioni tipografiche e decorazione ai viewport maggiori preservati. Nessuna funzionalità aggiunta. Nessun test che confronti semplicemente la stringa CSS: verifica effettiva del foglio servito e del risultato nel browser.

Dopo build e riavvio Wrangler: foglio `/assets/CAgcGe9--style.css` caricato; decorazione `display: none` a 320 e 360 px, `block` a 390, 768 e 1440; nessun overflow in questi cinque controlli. Screenshot viewport prima/dopo 320×844 salvati e letti: il titolo dopo la correzione non è coperto. Dati in `hero-regression.json`.

### Verifiche tecniche della correzione

Preview precedente fermata identificando CLI e figli per percorso/PID del progetto, prima della rebuild. Comandi effettivi dalla radice:

```powershell
npm run typecheck
npm run lint
npm run build
node node_modules/wrangler/bin/wrangler.js pages dev dist --ip 127.0.0.1 --port 8798 --inspector-port 0
# Seconda shell:
$env:SSR_BASE_URL = 'http://127.0.0.1:8798'
npm test
npm run fmt
npm run fmt.check
```

Typecheck e lint exit 0; build exit 0, controlli interni superati: 81 moduli client, 41 SSR, CSS 26,94 kB / 6,45 kB gzip. Artefatti Pages e sola 404 ausiliaria statica, come prima. Avvisi font runtime e NO_COLOR già documentati, nessun nuovo errore. Preview ricompilata con successo dopo la build. **31/31 test passati**: 21 unitari Node e 10 HTTP SSR sulla nuova build, nessuno fallito/saltato. Formattazione verificata. L'audit non è stato ripetuto dopo questa sola correzione CSS; dipendenze e superficie applicativa invariate, restano le 12 segnalazioni approfondite nella prima esecuzione 4A.

### Evidenze e chiusura

Il [manifest](evidence/milestone-4a/README.md) collega screenshot rappresentativi delle cinque pagine, coppia prima/dopo e report. `captures-resume.json` registra dimensioni, byte e SHA-256 dei PNG versionati; le catture full-page sono larghe quanto il contenuto senza scrollbar (15 px meno del viewport in questa sessione), quelle viewport prima/dopo sono 320×844. I bordi del solo bitmap non sono usati come prova di overflow. Gli altri screenshot completi restano in `artifacts/milestone-4a-resume`, ignorata da Git. Nessun asset del sito rigenerato o screenshot alterato.

Aggiornati QA_MANUAL, CONTENT_AUDIT, README, ARCHITECTURE, DEPLOYMENT e CASE_STUDY con la nuova copertura, mantenendo il precedente blocco come fatto storico. Preview della sessione fermata identificando i soli processi pertinenti. Commit e push sul solo branch corrente, signing disattivato nel singolo comando; hash nel resoconto finale e in `git log --oneline cad3b09..HEAD`. Nessun merge, rebase, deploy o modifica ai servizi Cloudflare. Collaudo ancora parziale per gli input e le voci aperte della checklist; nessun avvio di nuove funzionalità o milestone.

## 2026-11-15 — Verifica browser esclusiva e sequenziale

### Perimetro e preparazione

Nuova richiesta esplicita del proprietario: completare solo le prove browser mancanti, con Playwright riservato a questa istanza e chiamate sequenziali. Letti AGENTS, MVP, worklog, DEPLOYMENT e checklist. Branch `feature/mvp-foundation`, HEAD `7480a4c`, working tree pulito; fetch del solo branch, confronto con origin `0 0`. Nessun subagente o lavoro su altre repository.

Individuate come mancanti: interazioni native dei filtri (combinazioni, deselezione, limite di tutte le esclusioni, stato vuoto e reset), tastiera/navigazione, FAQ azionate, stati filtrati/vuoti responsive e le celle visuali ancora aperte in QA_MANUAL. Le 20 misure iniziali, gli screenshot riusciti, l'audit e le scansioni axe già documentati non sono stati ripetuti.

Entrambe le porte 8797/8798 libere al controllo iniziale. Usata **8797**, porta standard di `npm run preview` in DEPLOYMENT, con gli artefatti Qwik City SSR già costruiti e verificati sulla medesima applicazione. Nessuna reinstallazione, rebuild o modifica del runtime/configurazione.

```powershell
npm run preview
# Seconda shell, prima di qualsiasi chiamata Playwright:
$baseUri = 'http://127.0.0.1:8797'
foreach ($route in @('/', '/menu/')) {
  $response = Invoke-WebRequest -Uri ($baseUri + $route) -TimeoutSec 10
  if ($response.StatusCode -ne 200 -or $response.Content -notmatch 'Osteria del Borgo') {
    throw 'Runtime non corrispondente al progetto'
  }
  [regex]::Match($response.Content, '<title[^>]*>([^<]+)</title>').Groups[1].Value
}
```

Wrangler 4.162.0: worker compilato, ascolto solo loopback, senza login. Preflight **HTTP 200** su entrambe le rotte, titoli corretti, 3 assaggi home e 18 righe menu nell'HTML. È una verifica di disponibilità richiesta per questa esecuzione, non una nuova esecuzione della suite SSR già superata.

### Punto di blocco e distinzione degli errori

Creata una scheda dedicata, indice 1; quella di connessione del servizio, indice 0, lasciata intatta. Impostato viewport 1440×1000 e ricevuto snapshot accessibilità del menu con 18 piatti. Prima della sequenza controllati URL esatto `http://127.0.0.1:8797/menu/`, `innerWidth/innerHeight` e precondizione di 18 righe. Tutte le chiamate attese in sequenza; nessun browser/processo condiviso riavviato, terminato o riconfigurato.

Primo controllo funzionale:

```javascript
await page.locator('input[value="latte"]').check({ timeout: 5000 });
```

Esito: **`TimeoutError: locator.check: Timeout 5000ms exceeded`**. Il locator risolve il checkbox effettivo (`value="latte"`, `name="excluded-allergens"`, handler Qwik presente), ma l'azione rimane al passo **`waiting for element to be visible, enabled and stable`**. Il click e la successiva attesa di 9 righe non risultano eseguiti. Nessun tentativo successivo di check, focus, input forzato, evento sintetico o screenshot di aggiramento.

Classificazione rigorosa: disponibilità HTTP/SSR confermata; servizio MCP rispondente con risultato di errore; **timeout dell'azione Playwright sui prerequisiti del click**, non un timeout del trasporto MCP. Causa non isolata. Non è stata raggiunta una condizione che dimostri un bug dei filtri; nessuna correzione applicativa giustificata. Anche in questa esecuzione esclusiva l'input resta non verificabile: non si attribuisce automaticamente il problema alla concorrenza di altre sessioni o all'applicazione.

Come richiesto, collaudo browser interrotto al primo blocco. Nessun nuovo pass su filtri, reset, tastiera, FAQ o viewport mancanti; la checklist mantiene aperti quei controlli. [Report della singola esecuzione](evidence/milestone-4a/exclusive-attempt.json), con preflight, precondizioni, punto di arresto e pulizia. Nessuna ripetizione di test tecnici già superati e documentati sulla stessa applicazione; questa consegna modifica soltanto documentazione/JSON, verificati con Prettier e `git diff --check`.

### Pulizia e consegna

Chiusa con Playwright la sola scheda dedicata indice 1; il servizio ha confermato la permanenza della scheda di connessione indice 0. Poi fermati esclusivamente wrapper Node Wrangler 57580, CLI 74080 e figli esbuild/Workerd identificati per parent PID e percorso sotto `node_modules` di questa repository. Nessun processo browser o runtime di altri progetti toccato; controllo finale: nessun listener 8797. Nessuna ulteriore chiamata Playwright dopo la chiusura della risorsa propria: MCP liberato per la sessione successiva.

Aggiornati WORKLOG, checklist e manifest delle evidenze. Nessuna modifica a codice, dipendenze, infrastruttura, AGENTS o MVP. Commit/push sul solo branch corrente, signing disattivato soltanto nel comando di commit. Nessun deploy, merge, rebase, reset o force push. Il collaudo mancante resta bloccato al punto sopra: occorre una futura verifica con input browser funzionante, senza dichiarare superati i casi non eseguiti.

## 2026-11-15 — Completamento del collaudo browser esclusivo

### Base e autorizzazione

Il proprietario ha richiesto di rieseguire e proseguire il collaudo, poi confermato «Finestra Chrome visibile» e «Chrome resta visibile accanto alla chat». Questa istruzione aggiorna la precedente richiesta di fermarsi al primo blocco. Una sola sessione agente, nessun subagente; Playwright usato esclusivamente e in sequenza. Base `44bf7b8`, `feature/mvp-foundation`, working tree inizialmente pulito e branch allineato a origin. Riletti AGENTS, MVP, direzione artistica, documentazione foundation, worklog, deployment e checklist. AGENTS e MVP invariati.

Riutilizzata l'installazione da lockfile già verificata nella precedente 4A: nessun `npm ci` o audit ripetuto in questa esecuzione, nessuna modifica a dipendenze o lockfile. Avviato solo `npm run preview` sulla porta standard 8797, loopback. Prima del browser verificati HTTP 200 e titoli home/menu; nuova scheda dedicata indice 1, lasciata intatta quella del servizio. Nessun processo di altri progetti toccato.

### Diagnosi dei timeout e confine delle prove

La scheda mostrava `document.visibilityState=hidden`, focus inizialmente false e **zero callback requestAnimationFrame in 250 ms**. `bringToFront` rendeva il focus true ma non la visibilità, senza ripristinare i frame. Il timeout di stabilità di Playwright avveniva prima del clic: non era una prova di difetto dei filtri né un timeout del trasporto MCP, che restituiva regolarmente l'errore dell'azione.

Un tentativo di creare una sessione CDP per la sola pagina è stato negato dal servizio (`Target.attachToBrowserTarget: Not allowed`); nessuna emulazione applicata, nessuna modifica alle impostazioni del browser o aggiramento del rifiuto. Un unico `check({force:true})` diagnostico ha prodotto eventi click/change trusted e nove righe: **escluso dai casi accettati**. Nessuna mutazione di checkbox/stato Qwik o dispatch sintetico per simulare risultati.

Dopo che il proprietario ha reso Chrome visibile sono ripresi i frame e passati gli input ordinari. Una successiva copertura della finestra ha riportato hidden: la precondizione della prova tastiera è fallita, senza attribuirle un pass. Ripristinata la visibilità e confermata dal proprietario, completata la suite. URL, viewport e visibility controllati prima delle sequenze; nessun riavvio o terminazione dei browser condivisi.

Durante la ricattura finale, il locator errato `input[value="grano"]` ha causato un timeout perché il valore effettivo è `glutine`: errore dello script QA corretto dopo lettura del dataset/DOM, non difetto applicativo. Analogamente la prima asserzione CSS cercava un bordo anziché `text-decoration`: sostituita con il controllo della sottolineatura effettivamente usata. I tentativi falliti non sono conteggiati come pass.

### Prove funzionali e accessibilità riuscite

- **23 casi menu con check/uncheck/click normali**, senza force: 18 iniziali; cinque categorie 4/4/4/3/3; Latte 9; Primi + Latte 1; aggiunta glutine 0; deselezione Latte lasciando Primi + glutine 1 risotto; reset 18; Dolci + Latte 0 e reset nello stato vuoto 18; tutte le 12 esclusioni 2 contorni; tutte le esclusioni in ogni categoria 0/0/0/2/0; tre cicli di selezione/deselezione; reload con stato iniziale. Confrontati ID reali e conteggio, righe allergeni, warning, legenda e reset. Questa suite precede il fix header; nessuna modifica successiva a dataset o logica menu.
- **9 sequenze tastiera** dopo il fix header: skip link con Tab/Invio al main, desktop Tab/Invio verso Storia, mobile Esplora/Invio e link Menu, frecce nei radio, Tab/Space sui checkbox fino allo stato vuoto, reset principale e reset vuoto con Invio, salto ai risultati focalizzabili. Verificati focus di 3 px e stato reale dei risultati.
- **7 controlli navigazione** dopo il fix header, cinque passaggi fra pagine più indietro/avanti; una sola voce desktop corrente e quattro inattive.
- **4 FAQ** azionate con Tab/Invio, aperte/chiuse e riportate allo stato iniziale, focus 3 px. Cattura ulteriore con tutte aperte.
- **8 stati responsive** del menu: filtrato (Primi + Latte, uno) e vuoto (aggiunta glutine, zero) a 1440/768/390/320 px. Nessun overflow, etichette non tagliate e almeno 44 px, warning e legenda presenti, ID e conteggio coerenti.
- **6 viste mancanti** completate: galleria 1440/768/390 con tre immagini caricate dopo scorrimento e decode; contatti 1440/768/320. Un H1, nessun overflow o nodo ispezionato fuori viewport. Unite alle catture già superate coprono le cinque pagine nei quattro viewport richiesti; home/storia e menu iniziale non ripetuti inutilmente.
- Axe-core 4.14.0 sul menu vuoto 390×844: **0 violazioni, 24 regole passate**. Conservati quattro incomplete color-contrast su simboli decorativi aria-hidden (menu mobile, freccia risultati e due reset). Nessuna soppressione né pass attribuito agli incomplete. Non ripetute le cinque scansioni iniziali già documentate.

Console finale: **0 errori, 0 warning**. Registro Network limitato alla propria origine locale: 1176 richieste della sessione, 1089 HTTP 200 e 87 HTTP 304; zero errori HTTP e zero errori rete registrati. Sono richieste accumulate, non una misurazione della singola pagina o delle prestazioni. Registro completo locale ignorato da Git; versionato soltanto il riepilogo, senza URL di connessione del servizio.

### Difetto applicativo riproducibile e regressione

Su home SSR → clic Storia, desktop con `aria-current=page` sia su `/` sia su `/storia/`; passando al menu, sia `/` sia `/menu/`. Mobile con link HTML nativi corretto. Il valore inattivo `undefined` nei Link Qwik City non rimuoveva l'attributo precedente nella navigazione client osservata.

Correzione limitata a `src/components/site-header/site-header.tsx`: valore esplicito `false` per il Link desktop inattivo. Adeguato in `src/global.css` il selettore dello stato corrente da presenza dell'attributo al solo `[aria-current="page"]`, preservando l'aspetto delle voci inattive. Nessun cambio a routing, SSR, struttura, filtri o design generale.

Dopo nuova build e riavvio della sola preview, cinque navigazioni client hanno verificato **una voce corrente sottolineata e quattro inattive senza sottolineatura**, con puntatore allontanato per escludere lo stile hover. CSS servito `/assets/xO3SoV-d-style.css`. Le verifiche precedenti di cronologia e tastiera sul fix header restano valide; la nuova regola limita il valore selezionato senza cambiare focus o layout.

Ricatturate ed esaminate **16 immagini originali** dopo il CSS finale: 8 stati menu, un'ulteriore combinazione vuota con uova a 390, 6 viste interne e tutte le FAQ aperte a 390. Cinque rappresentative versionate, altre undici in `artifacts/milestone-4a-final` ignorata. Una prima cattura a pagina scorsa mostrava lo skip link nel bitmap fuori dalla sua posizione; la lettura DOM del link non focalizzato confermava bottom −20,72 px, sopra il viewport. Catture finali eseguite con scroll zero, senza alterare screenshot o CSS dello skip link. Titoli, descrizioni, prezzi, allergeni, immagini, focus, ritorni a capo e spaziature esaminati; nessun altro difetto riproducibile rilevato.

### Verifiche tecniche effettive

La preview è stata fermata prima di ciascuna rebuild identificando CLI e figli per PID/percorso sotto questa repository. Dopo il fix header e dopo il selettore CSS finale eseguiti:

```powershell
npm run typecheck
npm run lint
npm run build
npm run preview
# Seconda shell, stessa radice:
npm test
```

Ultima esecuzione: typecheck exit 0, lint exit 0, build exit 0; 81 moduli client, 41 SSR, CSS 26,95 kB / 6,45 kB gzip, artefatti Pages presenti e sola 404 ausiliaria statica. Warning noti di risoluzione runtime del font e NO_COLOR, nessun nuovo errore. Test **31/31 passati**, 21 unitari e 10 HTTP SSR, zero falliti/saltati. HTTP SSR di home e rotte interne con contenuto e metadati significativi senza JavaScript client; asset, catalogo completo e assenza di prerender statici verificati dai test. Non usato Vite dev per l'accettazione.

Dopo la documentazione eseguiti `npm run fmt`, `npm run fmt.check` e `git diff --check`. Dipendenze invariate: restano le 12 segnalazioni upstream già esaminate nella prima 4A; nessun aggiornamento forzato e nessuna nuova attestazione di sicurezza.

### Evidenze, limiti e chiusura

Report versionati: `browser-functional-final.json` (23 casi), `browser-final.json` (tastiera, navigazione, FAQ, responsive, axe, diagnosi e pulizia), `captures-final.json` (viewport, URL, dimensioni, byte e SHA-256 delle 16 catture). Collegamenti nel manifest. Aggiornati README, QA_MANUAL, ARCHITECTURE, DEPLOYMENT, CASE_STUDY e CONTENT_AUDIT; raccomandazioni editoriali preservate, nessun nuovo contenuto pubblico.

Controlli funzionali e responsive principali di M3/4A ora completati. **Non eseguiti** screen reader, zoom browser reale 200%, disabilitazione JS nelle impostazioni browser, Safari/dispositivi fisici o Lighthouse; i test HTTP SSR non sono presentati come queste prove browser. Nessuna dichiarazione WCAG completa; incomplete axe e audit upstream restano espliciti.

Chiusa soltanto la scheda dedicata indice 1, senza altre chiamate browser successive. Terminati wrapper/CLI Wrangler 75124/18972 e figli identificati per parent PID e percorso sotto i node_modules del progetto; nessun listener residuo 8797. Browser condivisi e runtime degli altri progetti invariati; Playwright liberato per la sessione successiva. Nessun deploy, login, servizio Cloudflare, merge, rebase o altra milestone avviata.

Commit atomico e push solo sul branch corrente, con `git -c commit.gpgsign=false commit`; hash nel resoconto finale e recuperabile con `git log --oneline 44bf7b8..HEAD`. Eventuali verifiche ulteriori o arricchimenti richiedono un nuovo task.

## 2026-11-16 — Milestone 4B: approfondimento editoriale

### Perimetro e base

Richiesta esplicita di arricchire Storia e Galleria senza nuove funzionalità o revisione dell'identità approvata. Letti integralmente AGENTS, MVP, BRAND_DIRECTION e CONTENT_AUDIT, più la chiusura 4A del worklog, CASE_STUDY e procedura locale. Base `0ec3d3f`, branch esistente `feature/mvp-foundation`, working tree inizialmente pulito; fetch del solo branch e confronto con origin `0 0`. Una sola sessione, nessun subagente o worktree.

### Scelte editoriali e modifiche

- **Storia:** l'episodio del mattarello, del quarto di giro, del lembo di sfoglia sollevato alla finestra e dei nidi di tagliatelle sostituisce i due paragrafi generici su pentola e sedie. Titolo e manifesto tipografico anticipano il tagliere. Due schede ripetitive su condivisione e scarpetta diventano dettagli di cucina: assaggio del sugo e ultimo giro nel tegame. Conservata la dichiarazione di narrativa fittizia, senza biografie, date, fornitori o tradizioni attribuite a un'attività reale.
- **Galleria:** le tre didascalie descrivono luce dalla finestra e ceramiche chiare, disposizione di tagliatelle e verdure attorno al vassoio, segni gastronomici del manifesto. Il paragrafo finale collega la sfoglia in cucina alla tavola; il link a Storia indica il racconto che si troverà. Indicazioni di immagini generate, piatti demo e locale fittizio preservate.
- **Composizione:** riutilizzate cornice pomodoro su panna, manifesto con marchio e fascia basilico già approvati. Nessuna sezione aggiunta, CSS modificato o nuovo asset. Valutata una piccola decorazione originale, ma il manifesto esistente svolge già quella funzione e un altro segno non aggiungerebbe informazione.
- Aggiornate le descrizioni SEO delle due pagine e soltanto il titolo atteso di Storia nella fixture del test HTTP SSR esistente. Nessun nuovo test E2E. Menu, filtri, prezzi, allergeni, relative avvertenze, homepage e navigazione invariati: verificato anche il diff dei file protetti dal perimetro.

Aggiornati CASE_STUDY e questo worklog; breve nota in README e seguito datato in CONTENT_AUDIT per distinguere le proposte ora attuate dalla valutazione storica 4A. ARCHITECTURE e DEPLOYMENT restano validi perché rendering, struttura, dipendenze e comandi non cambiano. AGENTS e MVP non modificati.

### Verifiche riproducibili

Node 22.16.0, npm 10.9.2. Comandi dalla radice; prima della build verificata libera la porta 8797 e assenza della preview da fermare:

```powershell
npm ci
npx --no-install prettier --write src/routes/storia/index.tsx src/routes/galleria/index.tsx tests/ssr.test.mjs
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm run preview
# Seconda shell, stessa radice:
npm run test:ssr
```

`npm ci` exit 0, lockfile invariato: 447 pacchetti aggiunti, 454 esaminati, 12 segnalazioni (8 moderate, 4 high), come già documentato in 4A. Avvisi di pacchetti deprecati e cleanup EPERM su una directory opzionale sharp-wasm32 sotto node_modules; l'installazione non è fallita. Nessun aggiornamento forzato, fix audit o rimozione manuale di directory. Typecheck e lint exit 0; **21/21 test unitari passati**, nessuno fallito o saltato. I comandi dopo l'installazione hanno richiesto più tempo rispetto alla precedente esecuzione, senza errori del sorgente.

**Build di produzione exit 0**: 81 moduli client, 41 SSR, CSS 27,01 kB / 6,47 kB gzip. Artefatti Pages generati, nessuna pagina pubblica prerenderizzata; sola 404 ausiliaria statica. Avvisi noti del font risolto al runtime e NO_COLOR, nessun errore. Typecheck e lint interni alla build superati.

Avviata la sola preview di questa sessione con `npm run preview`, Wrangler 4.162.0 su `http://127.0.0.1:8797`, senza login o binding remoti. **10/10 test HTTP SSR passati**, zero falliti o saltati: complessivamente 31/31 nei due runner esistenti. Verificati contenuti e metadati, collegamenti e asset, 404 reale, catalogo e avvertenze del menu, font e artefatti SSR.

Controllo HTTP mirato aggiuntivo, senza browser: richieste dirette a `/storia/` e `/galleria/`, rimozione di script e commenti e confronto del testo del main con quattro marker della nuova narrativa e sei delle didascalie/dichiarazioni della galleria. Entrambe HTTP 200, metadato description presente; zero img nel main di Storia e tre nella Galleria. Confronto statico prima/dopo: tre sezioni Storia e due Galleria, numeri invariati. Nessun nuovo test salvato o dipendenza introdotta per queste letture. Riproduzione rapida dalla seconda shell, con preview attiva:

```powershell
foreach ($route in @('/storia/', '/galleria/')) {
  $response = Invoke-WebRequest ('http://127.0.0.1:8797' + $route)
  $html = $response.Content -replace '(?is)<script\b[^>]*>.*?</script>', ''
  $html = $html -replace '(?s)<!--.*?-->', ''
  $response.StatusCode
  $html | Select-String 'tagliere|nidi infarinati|Luce dalla finestra|Locale fittizio|name="description"'
}
```

Eseguite formattazione dei file modificati, `npm run fmt.check` e `git diff --check`. Nessun cambiamento a lockfile, CSS, asset, dati/logica/UI menu, specifiche o configurazione Wrangler.

### Limiti e consegna

Per istruzione esplicita del proprietario non usati Playwright MCP, CUA, altri browser agentici o nuovi E2E. Nessun nuovo screenshot o collaudo visuale/responsive dei testi 4B dichiarato: le evidenze 4A rimangono riferite ai contenuti precedenti. I controlli sul sorgente e le risposte HTTP non sostituiscono una verifica visuale. Nessuna nuova dipendenza, API, prenotazione, integrazione, deploy, merge, rebase o modifica Cloudflare. Arresto al completamento della sola milestone 4B.

Al termine fermata soltanto la preview propria, identificando parent PID e percorsi dei figli sotto i node_modules della repository, verificata libera la porta 8797. Commit atomico e push al solo branch `feature/mvp-foundation`, signing disattivato con il singolo `git -c commit.gpgsign=false commit`; hash nel resoconto finale e in `git log --oneline 0ec3d3f..HEAD`. I residui npm sono quelli indicati sopra; nessun altro blocco tecnico. Eventuale revisione visuale manuale dei nuovi testi resta una verifica distinta, senza avviare automaticamente un'altra milestone.
