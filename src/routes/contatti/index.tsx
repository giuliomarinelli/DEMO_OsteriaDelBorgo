import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";

export default component$(() => (
  <>
    <PageIntro
      number="04 /"
      eyebrow="CONTATTI E PRENOTAZIONI"
      title="Per ora, tienici un posto nella fantasia."
    >
      <p>
        Ci piacerebbe dirti «ci vediamo domenica». Prima, però, una cosa
        importante: questa osteria è un progetto demo, non un ristorante aperto
        al pubblico.
      </p>
    </PageIntro>
    <section class="shell section-space contact-grid">
      <div class="contact-card">
        <BorgoMark />
        <p class="eyebrow">QUI SI PRENOTA SOLO CON L’IMMAGINAZIONE</p>
        <h2>
          Niente telefono.
          <br />
          Niente citofono.
        </h2>
        <p>
          Non ci sono indirizzi da raggiungere, orari di apertura, recapiti
          operativi o tavoli da riservare. Nessuna richiesta viene inviata e
          nessun dato di prenotazione viene raccolto.
        </p>
        <Link class="button button-cream" href="/menu/">
          Intanto, sfoglia il menu <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div class="faq">
        <p class="eyebrow">DUE DOMANDE, RISPOSTE SINCERE.</p>
        <h2>Facciamo chiarezza.</h2>
        <details open>
          <summary>L’Osteria del Borgo esiste davvero?</summary>
          <p>
            Esiste come sito dimostrativo di portfolio. Nome, storia, ambiente e
            proposta gastronomica sono stati inventati per raccontare una
            trattoria italiana e il suo carattere.
          </p>
        </details>
        <details>
          <summary>Posso prenotare o ordinare?</summary>
          <p>
            No. Non c’è un servizio di prenotazione, consegna o pagamento. In
            questa versione non trovi un modulo da compilare: puoi esplorare
            liberamente il sito senza inviare dati.
          </p>
        </details>
        <details>
          <summary>Le fotografie sono di un locale reale?</summary>
          <p>
            No. Le immagini fotografiche sono generate con AI e dichiarate come
            tali nelle didascalie. Sono affiancate da illustrazioni originali
            create per il progetto.
          </p>
        </details>
        <details>
          <summary>E i prezzi e gli allergeni del menu?</summary>
          <p>
            Sono informazioni dimostrative, associate a piatti inventati. Non
            sono una proposta commerciale e non possono guidare scelte
            alimentari in caso di allergie o intolleranze. Per un pasto reale
            occorrono informazioni ufficiali dell’esercente.
          </p>
        </details>
      </div>
    </section>
    <aside class="shell contact-end">
      <p>Fatte le presentazioni, c’è ancora qualcosa di buono da scoprire.</p>
      <Link class="text-link" href="/galleria/">
        Un giro tra i tavoli ↗
      </Link>
    </aside>
  </>
));
export const head: DocumentHead = {
  title: "Contatti e informazioni sulla demo — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Tutto chiaro prima di accomodarsi: Osteria del Borgo è un progetto fittizio. Nessun recapito operativo, ordine o prenotazione reale; risposte alle domande sulla demo.",
    },
  ],
};
