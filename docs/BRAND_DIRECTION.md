# Direzione di marca — Osteria del Borgo

## Idea

«Aggiungi un posto a tavola.» Il Borgo parla di pranzo, appetito e compagnia. Insegne di trattoria, menu stampati e manifesti gastronomici diventano caratteri pieni, bordi netti e immagini che fanno venire fame. La trattoria è fittizia: fascia superiore, footer e contenuti lo dichiarano. Nessuna recensione, premio o tradizione storica reale viene inventata.

## Palette

| Colore     | Valore    | Ruolo                                            |
| ---------- | --------- | ------------------------------------------------ |
| Pomodoro   | `#A93427` | Marchio, titoli, CTA, fascia conviviale e footer |
| Panna      | `#FFF0D2` | Fondo, carta del menu e testo sui fondi scuri    |
| Basilico   | `#356348` | Timbri, racconto e note sugli allergeni          |
| Inchiostro | `#29251F` | Testi lunghi, prezzi e focus sul chiaro          |

Token Tailwind in `src/global.css`; `#F4DFB9` è la carta secondaria. I colori non significano «sicuro per allergici». Contrasto sRGB calcolato senza trasparenze: pomodoro/panna **5,81:1**, basilico/panna **6,15:1**, inchiostro/panna **13,52:1**. Focus panna sui fondi rossi e verdi. Questi rapporti non sostituiscono un audit dell'intera UI.

## Tipografia e composizione

Fraunces 800 per i titoli: un WOFF2 latino locale da 18.224 byte, licenza OFL 1.1 inclusa, `font-display: swap` e preload. Arial/Helvetica di sistema per corpo, prezzi, allergeni e navigazione. Nessun provider font contattato dal browser; maiuscole soltanto nelle etichette brevi.

- Hero centrale su due righe, pomodoro inciso, timbro laterale, CTA e foto ampia con etichetta inclinata. Il testo essenziale rimane HTML.
- Fascia rossa statica: niente marquee, carousel o movimento continuo.
- Sezioni panna, carta calda e basilico: invito, carattere, assaggi, ambiente e chiarezza sulla demo.
- Menu con cornice doppia, numeri, leader puntinati, nome/prezzo insieme, descrizione e allergeni sotto. Filtri nativi incorniciati, selezione pomodoro/panna e collegamento ai risultati.
- Mobile in colonna, decorazioni ridotte, menu HTML nativo; nessuna informazione essenziale nascosta.

## Segni e immagini

Pomodoro originale con silhouette irregolare, foglie basilico e tratteggi panna; decorativo accanto al nome del marchio. Manifesto originale `a-tavola.svg` con piatto, pasta, posate e «A tavola si sta insieme». Due immagini Imagegen raccontano pranzo e sala immaginari, senza volti identificabili: WebP locali, varianti responsive e didascalie/alt che le dichiarano generate. Non documentano un ristorante reale. Prompt, provenienza e font in [ASSETS.md](ASSETS.md).

## Voce

Calorosa, concreta e un po' ironica. Dare del tu, parlare di sfoglia, pane, sugo, sedie e piatti da passare. Una battuta basta; allergeni, demo e prenotazioni richiedono parole dirette. Esempi: «La pasta è fresca, il sugo borbotta», «Qui il sugo fa conversazione», «Il bis non è un obbligo. È un'opinione molto diffusa». Evitare formule turistiche e «sapori di una terra senza tempo».

## Perimetro

La milestone 2 ha definito contenuti e identità delle cinque pagine e sei assaggi editoriali. La milestone 3 estende quel linguaggio a 18 piatti in cinque portate, filtri combinabili, reset, conteggio e stato vuoto «Qui il piatto è vuoto». Radio e checkbox restano riconoscibili; bordi e colore accompagnano lo stato nativo, con focus visibile e etichette ampie. Avvertenze alimentari in linguaggio diretto, senza ironia o colori che suggeriscano sicurezza. Una sola immagine pertinente riusa il pranzo generato già documentato; nessuna foto generica attribuita agli altri piatti. Prenotazioni simulate escluse da questa fase. Nessun nuovo servizio o backend; Qwik City SSR e adapter Pages preservati.
