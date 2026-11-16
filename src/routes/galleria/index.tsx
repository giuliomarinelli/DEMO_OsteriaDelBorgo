/* eslint-disable qwik/jsx-img -- Local WebP images are pre-sized and the poster is an original vector. */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";

export default component$(() => (
  <>
    <PageIntro
      number="03 /"
      eyebrow="GALLERIA E AMBIENTE"
      title="Tovaglia a quadretti. Idee chiare."
    >
      <p>
        Dalla sfoglia sul tagliere alle tagliatelle nel vassoio. Tre immagini
        per guardare come cucina e sala si incontrano nel nostro Borgo
        immaginario.
      </p>
    </PageIntro>
    <section class="shell gallery-section">
      <figure class="gallery-wide">
        <img
          src="/images/sala-del-borgo-1440.webp"
          srcset="/images/sala-del-borgo-960.webp 960w, /images/sala-del-borgo-1440.webp 1440w"
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1400px) calc(100vw - 96px), 1280px"
          width="1440"
          height="960"
          fetchPriority="high"
          alt="Immagine generata della sala immaginaria: tavolo per quattro, sedie rosse, basilico e luce dalla finestra."
        />
        <figcaption>
          <span>
            01 / La sala. Luce dalla finestra, ceramiche chiare e quadretti
            rossi: una tavola pensata per far risaltare il pranzo.
          </span>
          <span>Immagine generata · Locale fittizio</span>
        </figcaption>
      </figure>
      <div class="gallery-pair">
        <figure>
          <img
            src="/images/pranzo-condiviso-720.webp"
            width="720"
            height="480"
            loading="lazy"
            alt="Immagine generata di pasta, pane e verdure condivisi su una tavola a quadretti."
          />
          <figcaption>
            02 / Il pranzo. Tagliatelle al pomodoro nel vassoio, verdure nei
            piatti piccoli. Apparecchiamo attorno alle portate, così si
            raggiunge tutto.
            <br />
            Immagine generata · Piatti dimostrativi
          </figcaption>
        </figure>
        <figure class="poster-figure">
          <img
            src="/images/a-tavola.svg"
            width="720"
            height="720"
            loading="lazy"
            alt="Manifesto illustrato originale con un piatto, forchetta, pomodoro e la scritta A tavola si sta insieme."
          />
          <figcaption>
            03 / Il promemoria. Un piatto, due posate e il pomodoro: la cucina
            diventa un’insegna da appendere in sala. Illustrazione originale.
          </figcaption>
        </figure>
      </div>
    </section>
    <section class="shell section-space grid gap-8 md:grid-cols-2 md:gap-16">
      <div>
        <p class="eyebrow">DAL BANCO DI CUCINA ALLA SALA</p>
        <h2>
          La sfoglia cambia posto.
          <br />
          Diventa pranzo.
        </h2>
      </div>
      <div class="prose-copy">
        <p>
          In cucina la pasta si raccoglie in nidi; in sala arriva distesa nel
          vassoio. Nella tavola che immaginiamo, i piatti piccoli lasciano
          spazio alle portate. Il vaso di basilico è l’unico centrotavola: se
          serve spazio, si sposta.
        </p>
        <p>
          Le immagini fotografiche di questa galleria sono generate con AI per
          il progetto. Non documentano un locale esistente, i suoi piatti o il
          suo servizio. L’illustrazione è un originale della demo.
        </p>
        <Link class="text-link" href="/storia/">
          Prima del vassoio: la sfoglia sul tagliere ↗
        </Link>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "L’ambiente e la galleria — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Dal tagliere al vassoio: luce, ceramiche e tagliatelle raccontano la sala immaginaria del Borgo. Immagini generate dichiarate e manifesto originale.",
    },
  ],
};
