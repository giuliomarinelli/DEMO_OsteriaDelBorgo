import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";

export default component$(() => (
  <>
    <PageIntro
      number="01 /"
      eyebrow="LA NOSTRA STORIA"
      title="Il pranzo comincia sul tagliere."
    >
      <p>
        Nel Borgo che ci siamo inventati, il primo rumore è quello del
        mattarello sul legno. I piatti possono aspettare ancora un momento.
      </p>
    </PageIntro>
    <section class="shell section-space story-chapter">
      <div class="story-poster">
        <BorgoMark />
        <p>
          Dal tagliere
          <br />
          alla forchetta.
        </p>
        <span class="eyebrow">UNA MATTINA NELLA NOSTRA CUCINA IMMAGINARIA</span>
      </div>
      <div class="prose-copy">
        <p class="eyebrow">UN EPISODIO INVENTATO, LE MANI IN PASTA</p>
        <h2>
          Un quarto di giro.
          <br />
          Un’altra passata.
        </h2>
        <p>
          È quasi ora di pranzo, nella nostra cucina immaginaria. Sul tagliere,
          la sfoglia fa un quarto di giro a ogni passata di mattarello. Chi la
          tira ne solleva un lembo verso la finestra per guardare quanto è
          sottile.
        </p>
        <p>
          Poi la lascia asciugare un poco, la arrotola e taglia le strisce.
          Qualcuna viene più larga: nessuno prende il righello. Le tagliatelle
          si aprono fra le dita e finiscono in piccoli nidi infarinati, pronti
          per la pentola. Sul grembiule rimane un’impronta di farina.
        </p>
        <p class="editorial-note">
          Questa narrativa è fittizia. Non ci sono una famiglia fondatrice, una
          data di apertura o una tradizione storica reale da rivendicare.
        </p>
      </div>
    </section>
    <section class="basil-section">
      <div class="shell section-space">
        <p class="eyebrow">TRE COSE SU CUI CI CAPIAMO</p>
        <h2>
          Le buone abitudini
          <br />
          del Borgo.
        </h2>
        <div class="principles-grid">
          <article>
            <span class="chapter-number">01</span>
            <h3>La stagione decide.</h3>
            <p>
              Zucca quando arriva il freddo, pomodori quando hanno sapore. Nella
              cucina che immaginiamo, si parte da quello che c’è di buono.
            </p>
          </article>
          <article>
            <span class="chapter-number">02</span>
            <h3>Si assaggia in cucina.</h3>
            <p>
              Il cucchiaino entra nel sugo prima del mestolo. Si assaggia e si
              aggiusta il sale: il piatto si decide anche in quel momento.
            </p>
          </article>
          <article>
            <span class="chapter-number">03</span>
            <h3>L’ultimo giro è nel tegame.</h3>
            <p>
              Le tagliatelle incontrano il sugo prima di arrivare in sala. Il
              pomodoro deve restare sulla pasta: la tovaglia ha già il suo
              disegno.
            </p>
          </article>
        </div>
      </div>
    </section>
    <section class="shell section-space story-end">
      <p class="eyebrow">ADESSO CHE CI CONOSCIAMO</p>
      <h2>Passiamo alle cose buone?</h2>
      <Link class="button" href="/menu/">
        Vediamo il menu <span aria-hidden="true">↗</span>
      </Link>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "La nostra storia — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Un mattarello, un quarto di giro e le tagliatelle sul tagliere: un breve racconto della cucina immaginaria di Osteria del Borgo. Storia dichiaratamente fittizia.",
    },
  ],
};
