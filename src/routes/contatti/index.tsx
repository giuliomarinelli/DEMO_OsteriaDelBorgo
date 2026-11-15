import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
export default component$(() => (
  <>
    <PageIntro
      number="04 /"
      eyebrow="CONTATTI E PRENOTAZIONI"
      title="Un posto a tavola. Per immaginare."
    >
      <p>
        Osteria del Borgo è un esercizio di identità, design e sviluppo. Non è
        un’attività aperta al pubblico.
      </p>
    </PageIntro>
    <section class="shell inner-section grid gap-10 md:grid-cols-2">
      <div class="prose-copy">
        <p class="eyebrow">INFORMAZIONI SULLA DEMO</p>
        <h2>Un borgo di fantasia.</h2>
        <p>
          Non ci sono un indirizzo da raggiungere, un numero da chiamare o orari
          di apertura reali. Le illustrazioni rappresentano un luogo immaginato.
        </p>
        <Link class="text-link" href="/storia/">
          Leggi la nostra storia ↗
        </Link>
      </div>
      <div class="notice-panel">
        <p class="eyebrow">PRENOTAZIONI NON DISPONIBILI</p>
        <h2>Qui non si prenota davvero.</h2>
        <p>
          Questa versione non raccoglie e non invia dati. Un’eventuale
          esperienza di prenotazione sarà solo simulata e dichiarata come tale.
        </p>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Contatti e demo — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Informazioni sul progetto fittizio Osteria del Borgo. Nessun contatto operativo, raccolta dati o prenotazione reale.",
    },
  ],
};
