import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
export default component$(() => (
  <PageIntro
    number="404 /"
    eyebrow="UN VICOLO SENZA USCITA"
    title="Questa pagina non è a tavola."
  >
    <p>Il percorso che cercavi non esiste. Ti riaccompagniamo all’ingresso.</p>
    <Link class="button" href="/">
      Torna alla homepage ↗
    </Link>
  </PageIntro>
));
export const head: DocumentHead = {
  title: "Pagina non trovata — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content: "Pagina non trovata nel sito dimostrativo Osteria del Borgo.",
    },
    { name: "robots", content: "noindex" },
  ],
};
