/* eslint-disable qwik/jsx-img -- This page uses only an original, cacheable SVG; raster variants are unnecessary. */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => (
  <>
    <section class="shell hero">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="tiny-star" aria-hidden="true">
            ✳
          </span>{" "}
          A TAVOLA, COME UNA VOLTA
        </p>
        <h1>
          Il gusto di
          <br />
          sentirsi <em>a casa.</em>
        </h1>
        <p class="hero-description">
          La pasta tirata a mano, il profumo del sugo,
          <br class="hidden lg:block" /> le chiacchiere che allungano il pranzo.
          <br class="hidden lg:block" /> Benvenuti nella nostra idea di osteria.
        </p>
        <Link href="/menu/" class="button">
          Dai un’occhiata al menu <span aria-hidden="true">↗</span>
        </Link>
        <p class="hero-note">
          Cucina italiana · Ingredienti di stagione · Storie da condividere
        </p>
      </div>
      <figure class="hero-art">
        <div class="art-label">
          <span aria-hidden="true">✳</span> Fatto con cura.
          <br />
          <i>Condiviso con piacere.</i>
        </div>
        <img
          src="/images/il-pranzo.svg"
          width="720"
          height="760"
          fetchPriority="high"
          alt="Illustrazione originale di un piatto di tagliatelle al pomodoro, basilico e una tovaglia a quadretti."
        />
        <figcaption>
          Appunti di un pranzo italiano <span>№ 01 — La pasta</span>
        </figcaption>
      </figure>
    </section>
    <div class="manifesto-strip">
      <span>Pasta fresca</span>
      <span aria-hidden="true">✳</span>
      <span>Tempo per stare insieme</span>
      <span aria-hidden="true">✳</span>
      <span>Il ritmo delle stagioni</span>
    </div>
    <section class="shell home-story">
      <div class="section-label">
        <span>01 /</span>
        <p class="eyebrow">LO SPIRITO DEL BORGO</p>
        <span class="section-line" />
      </div>
      <div class="grid gap-8 md:grid-cols-2 md:gap-20">
        <h2>
          Un posto semplice.
          <br />
          <em>Da ricordare.</em>
        </h2>
        <div class="story-copy">
          <p>
            Ci siamo immaginati un’osteria tra i vicoli di un borgo italiano.
            Pochi tavoli, una tovaglia apparecchiata bene e una cucina che segue
            le stagioni, senza fretta.
          </p>
          <p>
            Osteria del Borgo è una storia inventata per un progetto di design e
            sviluppo web. La voglia di fare le cose con cura, invece, è reale.
          </p>
          <Link class="text-link" href="/storia/">
            Entra nella nostra storia <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
    <section class="shell home-paths" aria-label="Esplora l’osteria">
      <Link class="path-card" href="/galleria/">
        <span class="eyebrow">02 / L’AMBIENTE</span>
        <h2>
          Il piacere
          <br />
          di fermarsi.
        </h2>
        <span class="text-link">Scopri lo spazio immaginato ↗</span>
      </Link>
      <Link class="path-card path-card-light" href="/contatti/">
        <span class="eyebrow">03 / LA DEMO</span>
        <h2>
          Prima di
          <br />
          accomodarti.
        </h2>
        <span class="text-link">Tutte le informazioni ↗</span>
      </Link>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Osteria del Borgo — Il gusto di sentirsi a casa",
  meta: [
    {
      name: "description",
      content:
        "Un’osteria italiana immaginaria: cucina di casa, pasta fresca e convivialità. Esplora il sito dimostrativo Osteria del Borgo.",
    },
  ],
};
