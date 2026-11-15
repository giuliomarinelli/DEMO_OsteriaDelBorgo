import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
export default component$(() => (
  <>
    <PageIntro
      number="02 /"
      eyebrow="IL MENU"
      title="La stagione detta la ricetta."
    >
      <p>
        La nostra idea di cucina parte da pochi ingredienti e dai gesti di ogni
        giorno. Qui prenderà forma il menu dimostrativo dell’osteria.
      </p>
    </PageIntro>
    <section class="shell inner-section">
      <div class="notice-panel">
        <p class="eyebrow">IL QUADERNO È APPENA APERTO</p>
        <h2>Stiamo apparecchiando il menu.</h2>
        <p>
          Questa prima versione prepara lo spazio. Piatti, prezzi indicativi e
          filtri per categoria e allergeni arriveranno in una milestone
          successiva.
        </p>
        <p class="small-copy">
          I futuri dati e filtri saranno dimostrativi e non sostituiranno
          informazioni ufficiali sugli allergeni. Non sono indicazioni di
          sicurezza alimentare.
        </p>
        <Link class="text-link" href="/">
          Torna a scoprire l’osteria ↗
        </Link>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Il menu — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Lo spazio del futuro menu dimostrativo di Osteria del Borgo. Piatti e filtri non sono ancora disponibili in questa prima versione.",
    },
  ],
};
