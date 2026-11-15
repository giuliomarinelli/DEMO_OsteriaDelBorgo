/* eslint-disable qwik/jsx-img -- Local art-directed WebP sources have explicit responsive variants and dimensions. */
import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";
import { MenuList } from "~/components/menu-list/menu-list";
import { menuPreview } from "~/content/menu-preview";

export default component$(() => (
  <>
    <section class="hero shell">
      <p class="eyebrow hero-eyebrow">CUCINA ITALIANA. CHIACCHIERE COMPRESE.</p>
      <div class="hero-heading">
        <span class="hero-tomato">
          <BorgoMark />
        </span>
        <h1>
          Aggiungi un posto
          <br />
          <span>a tavola.</span>
        </h1>
        <span class="stamp hero-stamp" aria-hidden="true">
          IL BIS È<br />
          SEMPRE UNA
          <br />
          <b>BUONA IDEA</b>
          <span>✳</span>
        </span>
      </div>
      <p class="hero-description">
        La pasta è fresca, il sugo borbotta.
        <br />
        Manca solo qualcuno con cui dividere il pane.
      </p>
      <div class="hero-actions">
        <Link class="button" href="/menu/">
          Diamo un’occhiata al menu <span aria-hidden="true">↗</span>
        </Link>
        <Link class="text-link" href="/storia/">
          Prima, due parole su di noi
        </Link>
      </div>
      <figure class="hero-photo">
        <span class="photo-label" aria-hidden="true">
          LA FELICITÀ SI PASSA DI MANO.
        </span>
        <img
          src="/images/pranzo-condiviso-1440.webp"
          srcset="/images/pranzo-condiviso-720.webp 720w, /images/pranzo-condiviso-1440.webp 1440w"
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1400px) calc(100vw - 96px), 1280px"
          width="1440"
          height="960"
          fetchPriority="high"
          alt="Immagine generata: tagliatelle al pomodoro, pane e verdure su una tavola a quadretti, con mani che condividono il pranzo."
        />
        <figcaption>
          Un pranzo come piace a noi.{" "}
          <span>Immagine generata · Osteria immaginaria</span>
        </figcaption>
      </figure>
    </section>
    <div class="table-ribbon">
      <span>PASTA FRESCA</span>
      <span aria-hidden="true">✳</span>
      <span>SCARPETTA D’OBBLIGO</span>
      <span aria-hidden="true">✳</span>
      <span>UN POSTO PER TUTTI</span>
    </div>
    <section class="shell section-space home-story">
      <div class="section-label">
        <span>01 /</span>
        <p class="eyebrow">LA NOSTRA IDEA DI OSTERIA</p>
      </div>
      <div class="grid gap-8 md:grid-cols-2 md:gap-16">
        <h2>
          Qui il sugo
          <br />
          fa conversazione.
        </h2>
        <div class="prose-copy">
          <p>
            Ci piacciono le tavole che si allungano, le ricette che non hanno
            bisogno di presentazioni e chi dice «solo un assaggio» per poi
            chiedere il bis.
          </p>
          <p>
            Il Borgo è la trattoria che ci siamo inventati per mettere insieme
            tutto questo. Nessuna stella da esibire: solo una gran voglia di
            stare a tavola.
          </p>
          <Link class="text-link" href="/storia/">
            Com’è cominciata questa storia ↗
          </Link>
        </div>
      </div>
    </section>
    <section class="menu-home">
      <div class="shell section-space">
        <div class="section-label">
          <span>02 /</span>
          <p class="eyebrow">DUE FORCHETTATE PER CONOSCERCI</p>
        </div>
        <div class="section-heading">
          <h2>
            Poche parole.
            <br />
            Bei piatti.
          </h2>
          <p>
            Un assaggio del nostro menu illustrativo.
            <br />
            Piatti e prezzi sono dimostrativi.
          </p>
        </div>
        <MenuList dishes={[menuPreview[0], menuPreview[2], menuPreview[4]]} />
        <div class="menu-home-end">
          <p>
            Gli allergeni indicati sono dati demo.
            <br />
            Non sono informazioni di sicurezza alimentare.
          </p>
          <Link class="button" href="/menu/">
            Sfoglia il menu demo <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
    <section class="shell section-space atmosphere-teaser">
      <figure>
        <img
          src="/images/sala-del-borgo-960.webp"
          width="960"
          height="640"
          loading="lazy"
          alt="Immagine generata di una piccola sala immaginaria con sedie rosse e una tavola apparecchiata."
        />
        <figcaption>
          Uno spazio inventato. L’atmosfera, quella giusta. · Immagine generata
        </figcaption>
      </figure>
      <div>
        <p class="eyebrow">03 / TIRATI SU UNA SEDIA</p>
        <h2>
          Il bello è<br />
          fermarsi.
        </h2>
        <p>
          Niente tovaglie da non toccare. Qui immaginiamo piatti al centro,
          bicchieri spaiati e un’altra storia da raccontare.
        </p>
        <Link class="text-link" href="/galleria/">
          Fai un giro in osteria ↗
        </Link>
      </div>
    </section>
    <aside class="demo-note shell">
      <span class="eyebrow">UNA PICCOLA NOTA, SCRITTA CHIARA.</span>
      <p>
        Questa osteria esiste solo qui: è un progetto demo. Storia, piatti e
        ambiente sono fittizi, le immagini fotografiche sono generate. Nessuna
        prenotazione o acquisto reale.
      </p>
      <Link class="text-link" href="/contatti/">
        Tutto sulla demo ↗
      </Link>
    </aside>
  </>
));
export const head: DocumentHead = {
  title: "Osteria del Borgo — Aggiungi un posto a tavola",
  meta: [
    {
      name: "description",
      content:
        "Pasta fresca, sugo e voglia di stare insieme. Entra nell’Osteria del Borgo: una trattoria italiana immaginaria, un sito demo tutto da sfogliare.",
    },
  ],
};
