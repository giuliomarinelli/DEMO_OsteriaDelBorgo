# AGENTS.md — DEMO Osteria del Borgo

## Obiettivo e perimetro
Realizzare un sito web dimostrativo credibile, veloce e accessibile per una trattoria italiana fittizia. La funzionalità distintiva è un **menu interattivo filtrabile per categoria e allergeni**. Questo progetto è un case study di portfolio, NON un'attività reale e NON un servizio di prenotazione operativo.

## Regole di esecuzione Codex
- Lavora in questa repository soltanto, con un'unica sessione agente. Non usare subagenti, worktree o orchestration multi-agent.
- Prima di intervenire leggi questo file e `docs/MVP.md`; rispetta scope e criteri di accettazione. Procedi per milestone piccole e verificabili, una alla volta.
- Git flow: `develop` integra lo sviluppo; usa `feature/*` da `develop` per le implementazioni. Non modificare/mergiare automaticamente `preview` o `master`. Il branch `preview` è staging; `master` è produzione. La promozione fra ambienti richiede decisione del proprietario.
- Preferisci React + Vite + TypeScript strict + Tailwind CSS, static build per Cloudflare Pages. Evita backend, database, autenticazione e servizi a pagamento.
- Priorità: contenuto e funzionamento visibili > astrazioni e infrastrutture sofisticate. Non aggiungere funzionalità non richieste.
- Per ogni milestone: aggiorna `docs/WORKLOG.md` con data, obiettivo, modifiche significative, ragioni delle scelte, comandi eseguiti, esiti di test/build, problemi e prossimi passi. Non includere ragionamenti interni; documenta le operazioni riproducibili.
- Mantieni `README.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md` e `docs/CASE_STUDY.md` coerenti con il software man mano che nascono. Nella documentazione di deployment includi anche rollback e configurazioni, senza segreti.
- Esegui installazione, typecheck, lint, test pertinenti e build di produzione. Se mancano script o test, creali con un ambito ragionevole; riporta onestamente eventuali blocchi.
- Non modificare DNS, token, Cloudflare account, impostazioni Access, pipeline remota o fatturazione e non eseguire deploy pubblici senza consenso esplicito. Nessuna credenziale nei commit.
- Usa asset originali o con licenza adeguata; annota crediti e licenze. Niente recensioni/attestazioni reali inventate. Le simulazioni devono essere etichettate come tali.
- Interfaccia responsive, accessibile da tastiera, semantica, con etichette chiare e stati vuoti; contrasto e focus visibili.

## Flusso desiderato
1. Scaffold e design system leggero.
2. Pagine pubbliche e contenuti demo.
3. Menu interattivo con filtri per categoria ed esclusione allergeni.
4. Test, rifinitura, documentazione e procedura di deploy; fermati prima di toccare ambienti remoti.

Alla fine di ogni task comunica: branch, commit, cosa funziona, comandi/test effettuati, limiti residui e task successivo.
