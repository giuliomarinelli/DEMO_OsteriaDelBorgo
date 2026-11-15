# Asset, provenienza e licenze

## Milestone 2 — file pubblicati

| File                                                                    | Provenienza e uso                                                                                                                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/pranzo-condiviso-720.webp`, `pranzo-condiviso-1440.webp` | Immagine gastronomica generata con il tool Imagegen integrato; scena fittizia per home e galleria. 88.354 e 281.682 byte.                         |
| `public/images/sala-del-borgo-960.webp`, `sala-del-borgo-1440.webp`     | Immagine d'ambiente generata con Imagegen; sala inventata per home e galleria. 116.120 e 224.268 byte.                                            |
| `public/images/a-tavola.svg`                                            | Manifesto vettoriale originale, scritto per il progetto.                                                                                          |
| `src/components/borgo-mark/borgo-mark.tsx`, `public/favicon.svg`        | Pomodoro e favicon originali, senza asset di terzi.                                                                                               |
| `public/fonts/fraunces-latin-800.woff2`                                 | Fraunces, autori The Fraunces Project, distribuito tramite Fontsource 5.3.0. Licenza SIL OFL 1.1 in `public/fonts/OFL-Fraunces.txt`. 18.224 byte. |

Le immagini fotografiche sono generate, non documentarie. Non ritraggono un esercizio reale, suoi clienti, ricette o servizio. Sono dichiarate nelle didascalie, negli alt e nella pagina contatti. Nessuna recensione o attestazione inventata. Gli SVG originali non richiedono attribuzioni a terzi; nessuna licenza dell'immagine di un locale reale è coinvolta. La distribuzione del font mantiene copyright e OFL; i font di corpo sono di sistema e non vengono distribuiti.

Milestone 3: riusato `pranzo-condiviso-720.webp` nella voce Tagliatelle del Borgo del menu, con alt/didascalia che dichiarano la generazione. File invariato, 720×480 px, lazy loading; nessun nuovo download, generazione o asset aggiunto. È una scena illustrativa con pasta al pomodoro, non una documentazione della ricetta. Gli altri piatti restano senza fotografia per evitare associazioni improprie.

Font: [progetto Fraunces](https://github.com/undercasetype/Fraunces), [famiglia su Google Fonts](https://fonts.google.com/specimen/Fraunces), [licenza upstream](https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/OFL.txt), [WOFF2 Fontsource 5.3.0](https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5.3.0/files/fraunces-latin-800-normal.woff2). Download una tantum in sviluppo; nessuna chiamata a questi provider a runtime.

## Generazione e preparazione

Modalità: tool Imagegen integrato, non CLI/API esterna e nessuna chiave aggiunta al progetto. Due generazioni nuove e separate, senza immagini di riferimento. Gli output PNG sono stati ispezionati e i derivati finali copiati nella repository come WebP. Sharp già transitivo nel progetto è stato usato soltanto per ridimensionamento e codifica, non per modificare il contenuto. Nessuna dipendenza applicativa aggiunta.

Ricodifica riproducibile con i PNG selezionati disponibili localmente: `sharp(input).resize({ width }).webp({ quality: 76, effort: 6 }).toFile(output)` per pranzo (720/1440 px), `sharp(input).resize({ width }).webp({ quality: 82 }).toFile(output)` per sala (960/1440 px). Rapporto 3:2, dimensioni esplicite in HTML, `srcset` dove utile e lazy loading sotto la hero. Non rigenerare immagini durante la build: i file finali sono versionati.

### Prompt finale — pranzo condiviso

```text
Use case: photorealistic-natural. Asset type: wide editorial food photograph for the fictional Italian trattoria Osteria del Borgo website. Primary request: a joyful authentic Italian Sunday lunch, photographed almost directly overhead, featuring a large white ceramic platter of hand-cut tagliatelle with rich tomato sauce and fresh basil in the center, small bowls of roasted vegetables, crusty torn bread, a modest glass of red wine, mismatched vintage cream plates and a red and ivory gingham tablecloth. Two natural adult hands at the edges passing bread, no faces. Inviting, tactile, delicious, imperfect and lived-in rather than luxury or fine dining. Natural afternoon window light, vibrant tomato red, basil green and warm cream, true appetizing food textures, editorial magazine quality. Wide landscape composition around 3:2, no typography, no lettering, no logos, no watermark. The central pasta platter must be fully visible with natural space around it for responsive crops. Image is fictional, not a real restaurant.
```

### Prompt finale — sala

```text
Use case: photorealistic-natural. Asset type: editorial interior photograph for a fictional Italian trattoria website. Primary request: an inviting small Italian neighborhood osteria, cozy but bright, a communal rustic wooden table set for four with ivory and red checked cloth, everyday cream ceramic plates, simple water glasses, a little basil plant, warm burgundy wooden chairs, vintage cream plaster walls, a timber sideboard and afternoon light from an open shutter. No people. Feel spontaneous, convivial and authentic, no luxury hotel aesthetic, no tourist clichés, no signage or readable text, no logos, no watermark. Natural warm light, tactile materials, tomato red #A93427, warm cream #FFF0D2 and basil green #356348 accents. Landscape 3:2 editorial photograph with excellent realistic detail. Entirely invented environment, not an existing restaurant.
```

## Asset conservati della foundation

`public/images/il-pranzo.svg` e `public/images/la-tavola.svg` sono illustrazioni originali della milestone 1, conservate senza modifiche e non usate dalla nuova composizione. Il nuovo marchio sostituisce la prima favicon. Le dipendenze software mantengono le proprie licenze nei pacchetti npm.
