# Evidenze milestone 4A — 15 novembre 2026

Applicazione: `00d76b3f1b2b6a0ad5d0090937e3833513e97c30`. Build Qwik City di produzione, servita da Wrangler 4.162.0/Workerd su `http://127.0.0.1:8798`. Le modifiche 4A riguardano test e documentazione, senza cambiare il codice applicativo.

| File                                             | Contenuto e limite                                                                                                                                                                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [home-1440.png](home-1440.png)                   | Screenshot originale Playwright della vista iniziale della home, 1440×1000, 928.111 byte. Esaminato: header, hero, CTA e inizio immagine gastronomica. Non è una cattura dell'intera pagina. SHA-256 `DBCA5877C005B52399D6F62725766937A88F54D4363D6817073CEB7ADA8D68D0`. |
| [dependency-review.json](dependency-review.json) | Versioni, conteggi e advisory npm, input del bundle SSR, import esterni e marker cercati nei moduli client/server. Analisi statica locale; non prova formale di non sfruttabilità.                                                                                       |

Il browser si è bloccato al primo controllo successivo delle risorse; la matrice non ha restituito un report completo. Nessuno screenshot mobile o delle pagine interne prodotto in 4A, nessun report visuale parziale presentato come completo. Procedure mancanti e limiti in [QA_MANUAL.md](../../QA_MANUAL.md) e [WORKLOG.md](../../WORKLOG.md). Nessuna immagine ottenuta modificando screenshot storici o simulando un viewport non eseguito.

Queste sono catture della UI originale del progetto e risultati di QA, non nuovi asset destinati al sito. Non includono credenziali o dati di clienti; la scena gastronomica è la stessa immagine generata già dichiarata in [ASSETS.md](../../ASSETS.md).
