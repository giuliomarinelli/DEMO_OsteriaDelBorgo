# Architettura — milestone 3

## Perimetro

Qwik City SSR e cinque pagine pubbliche con identità e contenuti. Menu interattivo di 18 piatti fittizi in antipasti (4), primi (4), secondi (4), contorni (3) e dolci (3). Categoria ed esclusioni multiple degli allergeni combinabili, conteggio, reset e stato vuoto. Prenotazione simulata esclusa da questa milestone. Nessun backend business, database, autenticazione, CMS o integrazione esterna.

## Rendering

`src/root.tsx` monta `QwikCityProvider`, `RouterHead` e `RouterOutlet`. Qwik City risolve le rotte file-based in `src/routes`. Il layout condiviso compone header, main e footer; le pagine esportano `DocumentHead` per titolo e descrizione.

La richiesta HTTP viene elaborata da `src/entry.cloudflare-pages.tsx`, che usa `createQwikCity` del middleware ufficiale Pages, il piano delle rotte generato e `src/entry.ssr.tsx`. Quest'ultimo usa `renderToStream` e imposta `lang="it"` sul documento. Il browser riceve subito contenuto e metadati; Qwik riprende le interazioni con le proprie QRL. Nessun framework React: `jsx: react-jsx` in TypeScript è il nome della trasformazione JSX automatica, con `jsxImportSource: @builder.io/qwik`.

L'adapter ufficiale in `adapters/cloudflare-pages/vite.config.ts` estende Vite con `ssr: true`. L'opzione `ssg: { include: [], exclude: ["/*"], maxWorkers: 1, sitemapOutFile: null }` esclude esplicitamente tutte le pagine pubbliche dalla generazione statica, mantenendo il post-build ufficiale dell'adapter. In Qwik City 1.20.4 `ssg: null` salta anche la creazione del worker e delle mappe: il problema è stato rilevato dalla verifica di produzione, non aggirato con una SPA. Il solo documento statico ausiliario è la pagina 404 creata dall'adapter; le cinque pagine pubbliche restano SSR.

Vite è esclusivamente la toolchain Qwik. `dist/_worker.js` è l'ingresso Pages Function in modalità avanzata e importa i moduli in `server`; Wrangler li include nel bundle. Non serve una cartella `functions` separata. `dist/_routes.json` invoca SSR sulle rotte applicative ed esclude gli asset statici. Un test richiede l'assenza di `index.html` prerenderizzati per tutte le pagine pubbliche.

## Struttura

```text
adapters/cloudflare-pages/vite.config.ts   adapter ufficiale
public/                                  SVG originali e file Pages
src/
  components/
    router-head/                         head e canonical facoltativo
    site-header/                         marchio e navigazione
    site-footer/                         footer e dichiarazione demo
    page-intro/                          introduzione comune alle pagine
    borgo-mark/                          pomodoro illustrato originale
    menu-list/                           nome, prezzo, descrizione, allergeni e immagine opzionale
  content/site.ts                        destinazioni della navigazione
  content/menu.ts                        catalogo tipizzato, portate, allergeni e tre assaggi home
  lib/menu-filters.ts                    selezione pura e stato iniziale dei filtri
  routes/
    layout.tsx                           layout condiviso
    index.tsx                            homepage
    storia/index.tsx                     narrativa fittizia e principi
    menu/index.tsx                       filtri locali reattivi, risultati e avvertenze
    galleria/index.tsx                   ambiente, immagini e manifesto
    contatti/index.tsx                   informazioni e FAQ, nessun invio
    404.tsx                              pagina non trovata
  entry.dev.tsx                          ingresso sviluppo
  entry.ssr.tsx                          rendering streaming
  entry.cloudflare-pages.tsx             ingresso produzione Pages
  global.css                             tema Tailwind e stile editoriale
  root.tsx                               documento Qwik City
tests/menu.test.mjs                       test della logica TypeScript e integrità dati
tests/ssr.test.mjs                        test HTTP sulla build reale
wrangler.jsonc                           runtime Pages locale
```

## UI, accessibilità e stato

Palette pomodoro/panna/basilico/inchiostro, font Fraunces 800 locale con OFL, SVG originali e WebP generati dichiarati. [BRAND_DIRECTION.md](BRAND_DIRECTION.md) definisce ruoli, composizione e voce. `BorgoMark` e `MenuList` si aggiungono ai componenti condivisi della foundation. Tailwind CSS 4 è integrato attraverso `@tailwindcss/vite`; utilities per griglie, spaziature e breakpoint, layer `components` per marchio, composizione e tipografia. Nessuna libreria UI aggiuntiva. I componenti condivisi rispondono a riuso effettivo; il resto rimane nelle pagine.

`component$`, `Slot`, `Link`, `useLocation` e `useDocumentHead` sono API Qwik. `useLocation` mantiene lo stato reattivo della rotta e `aria-current`. Il menu mobile usa `details/summary` nativi e collegamenti HTML per funzionare anche senza JS. Il menu desktop usa `Link` di Qwik City. Sono presenti skip link, landmarks, un H1 per pagina, alt delle illustrazioni e focus visibile. Nessun form o invio dati.

## Dati e interazione del menu

`src/content/menu.ts` è l'unica sorgente del catalogo: ID stabili, descrizioni, prezzo indicativo come stringa, categoria tipizzata e array di ID degli allergeni. Le etichette leggibili provengono da una mappa comune ai checkbox, ai piatti e alla legenda. Le 12 voci rappresentano soltanto quelle associate alle ricette inventate, non una certificazione o un elenco normativo completo. Un array vuoto significa «nessuno indicato nei dati», senza deduzioni su assenza reale o contaminazioni. I tre assaggi home sono selezionati per ID, senza duplicare il dataset.

`filterDishes` è una funzione pura: una categoria singola (o `all`) si combina in AND con le esclusioni. Fra allergeni esclusi vale OR: basta una corrispondenza per rimuovere un piatto. L'ordine del catalogo resta invariato e gli input non vengono mutati. `createDefaultFilters` restituisce un nuovo oggetto e un nuovo array, evitando stato condiviso fra istanze/richieste SSR.

La rotta crea `useStore(createDefaultFilters())`; `useComputed$` deriva risultati e presenza di filtri, mentre handler QRL aggiornano categoria o sostituiscono l'array di esclusioni. Reset azzera entrambe le selezioni. Le sezioni vengono ricavate direttamente dai risultati durante il render e `MenuList` legge le props reattive; nessuna copia dello stato derivato in uno store, fetch, persistenza o parametro URL. Si evita un secondo raggruppamento computed di oggetti intermedi: nella verifica browser quella versione lasciava righe precedenti visibili, anche con contatore aggiornato.

Radio e checkbox nativi sono raggruppati da `fieldset/legend`, con istruzioni associate, etichette cliccabili di almeno 44 px e focus di 3 px. Lo stato selezionato usa sia il controllo nativo sia il colore; `role="status"` con `aria-live="polite"` annuncia il conteggio. I cambiamenti non spostano automaticamente il focus. Il collegamento «Vai ai risultati» raggiunge una regione nominata e focalizzabile; lo stato vuoto offre un reset aggiuntivo. Avvertenza iniziale e legenda restano renderizzate anche con zero risultati, gli allergeni sono testo visibile sotto ogni piatto mostrato.

SSR restituisce sempre il catalogo completo e i metadati. Senza JS il contenuto resta leggibile e `noscript` spiega il limite dei filtri; `@media (scripting: none)` nasconde i controlli non utilizzabili nei browser che supportano questa media query. La regola è nel CSS globale, non in uno `style` dentro `noscript`, per non attivarsi dopo aggiornamenti DOM Qwik. Il menu riusa solo il WebP gastronomico già documentato per le tagliatelle, con alt/didascalia generata, dimensioni e lazy loading. Gli altri piatti rimangono tipografici, senza immagini non pertinenti.

## Dipendenze e configurazione

Qwik e Qwik City 1.20.4 stabili, TypeScript 5.9 strict, Tailwind 4.3, Vite 7.3, Wrangler 4.162. Le risoluzioni esatte sono in `package-lock.json`; usare npm e `npm ci`. Node verificato: 22.16.0, npm 10.9.2. Le dipendenze Qwik sono `devDependencies` secondo lo starter: l'output SSR le include nel bundle, non richiede `node_modules` in hosting.

`axe-core` 4.14.0 è solo uno strumento di verifica di sviluppo, caricato nella sessione browser di QA; non è importato da `src` né incluso nell'app. Nessuna nuova dipendenza runtime. I test unitari usano il runner Node e il type stripping nativo per eseguire la funzione TypeScript reale, senza mantenere una seconda implementazione JavaScript.

`VITE_SITE_ORIGIN` è facoltativo e pubblico, letto alla build. Deve essere un'origine HTTP(S) senza percorso, query o slash finale. Se omesso, non viene emesso un canonical inventato; se impostato, il canonical usa il pathname della rotta senza query. Non è una credenziale. Non servono token, binding o account Cloudflare per il runtime locale.

`wrangler.jsonc` contiene un nome locale descrittivo, output `dist`, compatibility date e flag `nodejs_als` richiesto dall'integrazione. Non contiene ID di account/progetti né configurazioni di ambienti remoti.

## Strategia di verifica

Typecheck dell'app e adapter; lint con regole Qwik, TypeScript e JavaScript sui test; build client + server. Diciannove test unitari coprono categorie, esclusioni singole/multiple, combinazioni, stato vuoto, reset, input immutabili e integrità del dataset. Dieci test HTTP richiedono direttamente le cinque pagine e controllano HTML senza script, metadati, navigazione, asset, 404, catalogo iniziale, controlli, allergeni, font e assenza di pagine prerenderizzate. Il runtime di riferimento è `wrangler pages dev`, non solo Vite. La verifica browser confronta anche gli ID delle righe con il contatore dopo le interazioni; responsive, tastiera e axe-core sono descritti nel worklog, senza equipararli a un audit WCAG completo.
