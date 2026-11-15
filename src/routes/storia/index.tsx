import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";

export default component$(() => (
  <>
    <PageIntro
      number="01 /"
      eyebrow="LA NOSTRA STORIA"
      title="Una scusa per stare insieme."
    >
      <p>
        Abbiamo immaginato un’osteria dove «resti a pranzo?» è una domanda
        seria. E «porto qualcosa?» ha sempre la stessa risposta: porta appetito.
      </p>
    </PageIntro>
    <section class="shell section-space story-chapter">
      <div class="story-poster">
        <BorgoMark />
        <p>
          Il sugo unisce.
          <br />
          Il pane aiuta.
        </p>
        <span class="eyebrow">PICCOLE VERITÀ DA TAVOLA</span>
      </div>
      <div class="prose-copy">
        <p class="eyebrow">È COMINCIATA COSÌ. PER FINTA.</p>
        <h2>
          Una cucina aperta.
          <br />
          Una sedia in più.
        </h2>
        <p>
          Nella nostra storia il Borgo nasce da un’abitudine: cucinare più del
          necessario. Una pentola capiente, qualcuno che bussa e il pranzo per
          due diventa un pranzo per sei. Le sedie si recuperano, il pane si
          spezza.
        </p>
        <p>
          Da quell’idea abbiamo costruito una trattoria di fantasia. Il menu
          segue i gesti semplici della cucina italiana: tirare la sfoglia,
          assaggiare il sugo, accorgersi che manca un pizzico di sale. Nessuna
          ricetta segreta. Al massimo, le dosi «a occhio».
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
            <h3>Il piatto si passa.</h3>
            <p>
              Un antipasto al centro è già una conversazione. Le porzioni si
              dividono, l’ultimo boccone si contratta.
            </p>
          </article>
          <article>
            <span class="chapter-number">03</span>
            <h3>Il pane resta.</h3>
            <p>
              Il sugo nel piatto è un invito. Noi la scarpetta la consideriamo
              un complimento alla cucina.
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
        "Una pentola grande e una sedia in più: la storia inventata di Osteria del Borgo, tra pasta fresca, piatti da condividere e buone abitudini a tavola.",
    },
  ],
};
