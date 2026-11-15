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

Un commit atomico di milestone include applicazione, configurazioni, lockfile, verifiche e documentazione. Signing disattivato soltanto per il comando `git -c commit.gpgsign=false commit`. Push limitato a `feature/mvp-foundation`, senza merge/rebase o modifiche a `develop`, `preview`, `master`. Hash del commit e conferma del push sono riportati nel resoconto di consegna; `git log -1 --oneline` permette di recuperarli senza dipendere dalla chat. Gli artefatti locali, screenshot, `.scaffold`, dipendenze e stato Wrangler sono ignorati e non fanno parte del commit.

### Dipendenze: limite noto

`npm audit` dopo gli aggiornamenti segnala 12 pacchetti interessati: 8 moderate e 4 high. Catene: `minimatch` tramite TypeScript ESLint/plugin Qwik; `sharp` tramite `vite-imagetools`/Qwik City; `zod` tramite Qwik City. Non applicato `npm audit fix --force`, che propone anche downgrade incompatibili del framework. Non sono implementati upload, trasformazioni di immagini dell'utente o validazione di input business; ciò non rende l'audit superato. Tutte le dipendenze sono di build secondo lo starter, ma una classificazione devDependency non esclude da sola l'inclusione di codice nel bundle server. Rivalutare gli aggiornamenti upstream prima di una pubblicazione.

### Prossimo task

Completare i contenuti delle pagine nella milestone successiva dopo richiesta del proprietario. Non avviare automaticamente dataset del menu, filtri, deploy o promozione dei branch.
