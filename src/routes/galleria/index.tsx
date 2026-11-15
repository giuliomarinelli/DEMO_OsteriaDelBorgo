/* eslint-disable qwik/jsx-img -- This page uses only an original, cacheable SVG; raster variants are unnecessary. */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
export default component$(() => (
  <>
    <PageIntro
      number="03 /"
      eyebrow="GALLERIA E AMBIENTE"
      title="C’è tempo per un altro boccone."
    >
      <p>
        Legno, lino e luce del pomeriggio. Il nostro spazio immaginato ha i
        colori della terra e il ritmo lento di un pranzo in compagnia.
      </p>
    </PageIntro>
    <section class="shell inner-section grid items-center gap-10 md:grid-cols-2">
      <figure class="gallery-art">
        <img
          src="/images/la-tavola.svg"
          width="800"
          height="600"
          loading="lazy"
          alt="Illustrazione di una tavola apparecchiata per due, con piatti, bicchieri e un rametto d’ulivo."
        />
        <figcaption>
          Studio d’atmosfera · Illustrazione originale, ambiente immaginario.
        </figcaption>
      </figure>
      <div class="prose-copy">
        <p class="eyebrow">PRIMI APPUNTI VISIVI</p>
        <h2>
          Una tavola,
          <br />
          mille conversazioni.
        </h2>
        <p>
          Questo primo studio racconta il carattere visivo del Borgo. La
          galleria completa sarà sviluppata nella fase dedicata ai contenuti.
        </p>
        <Link class="text-link" href="/storia/">
          La storia dietro l’atmosfera ↗
        </Link>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "L’ambiente — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Un primo studio illustrato dell’ambiente immaginario di Osteria del Borgo. Galleria iniziale del progetto demo.",
    },
  ],
};
