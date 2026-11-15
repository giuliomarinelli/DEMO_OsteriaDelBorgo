import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
export default component$(() => (
  <>
    <PageIntro
      number="01 /"
      eyebrow="LA NOSTRA STORIA"
      title="Le cose buone, quelle semplici."
    >
      <p>
        Una porta aperta sui vicoli, un quaderno di ricette sul tavolo. La
        nostra osteria nasce così: dall’immaginazione.
      </p>
    </PageIntro>
    <section class="shell inner-section grid gap-10 md:grid-cols-[1fr_1.3fr]">
      <p class="eyebrow">UNA NARRATIVA FITTIZIA</p>
      <div class="prose-copy">
        <h2>Una tavola che unisce.</h2>
        <p>
          Il Borgo è il luogo che abbiamo inventato per raccontare una cucina
          italiana familiare: la sfoglia della domenica, le verdure dell’orto,
          il pane da dividere.
        </p>
        <p>
          Non raccontiamo la storia di un ristorante esistente. Questa è la
          prima pagina di un case study: identità, contenuti e luogo sono
          dimostrativi.
        </p>
        <Link class="text-link" href="/galleria/">
          Uno sguardo all’ambiente ↗
        </Link>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "La nostra storia — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "L’idea di una trattoria italiana accogliente. Scopri la narrativa fittizia alla base del progetto demo Osteria del Borgo.",
    },
  ],
};
