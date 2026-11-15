# Architettura — milestone 2

## Perimetro

Fondamenta Qwik City SSR e cinque pagine pubbliche con identità e contenuti completati. Menu editoriale con sei esempi statici in `src/content/menu-preview.ts`, condivisi tra home e menu tramite `MenuList`; non è ancora il catalogo completo interattivo. Filtri e prenotazione simulata sono esclusi. Nessun backend business, database, autenticazione, CMS o integrazione esterna.

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
    menu-list/                           nome, prezzo e allergeni degli assaggi
  content/site.ts                        destinazioni della navigazione
  content/menu-preview.ts                sei assaggi editoriali statici
  routes/
    layout.tsx                           layout condiviso
    index.tsx                            homepage
    storia/index.tsx                     narrativa fittizia e principi
    menu/index.tsx                       menu editoriale, nessun filtro
    galleria/index.tsx                   ambiente, immagini e manifesto
    contatti/index.tsx                   informazioni e FAQ, nessun invio
    404.tsx                              pagina non trovata
  entry.dev.tsx                          ingresso sviluppo
  entry.ssr.tsx                          rendering streaming
  entry.cloudflare-pages.tsx             ingresso produzione Pages
  global.css                             tema Tailwind e stile editoriale
  root.tsx                               documento Qwik City
tests/ssr.test.mjs                        test HTTP sulla build reale
wrangler.jsonc                           runtime Pages locale
```

## UI, accessibilità e stato

Palette pomodoro/panna/basilico/inchiostro, font Fraunces 800 locale con OFL, SVG originali e WebP generati dichiarati. [BRAND_DIRECTION.md](BRAND_DIRECTION.md) definisce ruoli, composizione e voce. `BorgoMark` e `MenuList` si aggiungono ai componenti condivisi della foundation. Tailwind CSS 4 è integrato attraverso `@tailwindcss/vite`; utilities per griglie, spaziature e breakpoint, layer `components` per marchio, composizione e tipografia. Nessuna libreria UI aggiuntiva. I componenti condivisi rispondono a riuso effettivo; il resto rimane nelle pagine.

`component$`, `Slot`, `Link`, `useLocation` e `useDocumentHead` sono API Qwik. `useLocation` mantiene lo stato reattivo della rotta e `aria-current`; nessuno stato client artificiale per i futuri filtri. Il menu mobile usa `details/summary` nativi e collegamenti HTML per funzionare anche senza JS. Il menu desktop usa `Link` di Qwik City. Sono presenti skip link, landmarks, un H1 per pagina, alt delle illustrazioni e focus visibile. Non sono implementati form o pulsanti senza azione.

## Dipendenze e configurazione

Qwik e Qwik City 1.20.4 stabili, TypeScript 5.9 strict, Tailwind 4.3, Vite 7.3, Wrangler 4.162. Le risoluzioni esatte sono in `package-lock.json`; usare npm e `npm ci`. Node verificato: 22.16.0, npm 10.9.2. Le dipendenze Qwik sono `devDependencies` secondo lo starter: l'output SSR le include nel bundle, non richiede `node_modules` in hosting.

`VITE_SITE_ORIGIN` è facoltativo e pubblico, letto alla build. Deve essere un'origine HTTP(S) senza percorso, query o slash finale. Se omesso, non viene emesso un canonical inventato; se impostato, il canonical usa il pathname della rotta senza query. Non è una credenziale. Non servono token, binding o account Cloudflare per il runtime locale.

`wrangler.jsonc` contiene un nome locale descrittivo, output `dist`, compatibility date e flag `nodejs_als` richiesto dall'integrazione. Non contiene ID di account/progetti né configurazioni di ambienti remoti.

## Strategia di verifica

Typecheck dell'app e adapter; lint con regole Qwik, TypeScript e JavaScript sui test; build client + server; dieci test Node che richiedono le cinque pagine direttamente, controllano HTML senza script, metadati, navigazione, asset, 404, contenuti demo/allergeni, font e assenza di pagine prerenderizzate. Il runtime di riferimento è `wrangler pages dev`, non solo il server Vite. Verifica browser responsive e tastiera descritta nel worklog; non equivale a un audit WCAG completo.
