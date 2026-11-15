import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
import { MenuList } from "~/components/menu-list/menu-list";
import { menuPreview } from "~/content/menu-preview";

const categories = [
  {
    id: "antipasti",
    title: "Per cominciare",
    note: "Un piatto al centro. E via con le forchette.",
  },
  {
    id: "primi",
    title: "La pasta, prima di tutto",
    note: "La sfoglia è una faccenda seria. Il pranzo, una bella scusa.",
  },
  {
    id: "dolci",
    title: "Uno spazio per il dolce",
    note: "Si trova sempre. Anche quando dici di no.",
  },
] as const;

export default component$(() => (
  <>
    <PageIntro
      number="02 /"
      eyebrow="IL MENU DEL BORGO"
      title="Prima si legge. Poi viene fame."
    >
      <p>
        Sugo lento, pasta fresca e il dolce «da dividere». Sei assaggi per
        raccontarti la nostra cucina immaginaria.
      </p>
    </PageIntro>
    <div class="shell menu-meta">
      <p>
        <strong>Menu illustrativo · Piatti e prezzi demo</strong>
        <br />
        Questa è un’anteprima editoriale. I filtri interattivi non sono ancora
        disponibili.
      </p>
      <nav aria-label="Vai alle portate">
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.title} <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>
    </div>
    <div class="shell menu-sheet">
      <div class="menu-sheet-top">
        <span>OSTERIA DEL BORGO</span>
        <span>IL PIACERE È CONDIVIDERE</span>
      </div>
      {categories.map((category, index) => (
        <section
          class="menu-category"
          id={category.id}
          key={category.id}
          aria-labelledby={`titolo-${category.id}`}
        >
          <div class="menu-category-heading">
            <span class="chapter-number">0{index + 1}</span>
            <div>
              <h2 id={`titolo-${category.id}`}>{category.title}</h2>
              <p>{category.note}</p>
            </div>
          </div>
          <MenuList
            dishes={menuPreview.filter((dish) => dish.category === category.id)}
          />
        </section>
      ))}
      <p class="menu-sheet-bottom">
        Il bis non è un obbligo. È un’opinione molto diffusa.
      </p>
    </div>
    <aside class="shell section-space allergy-note">
      <p class="eyebrow">ALLERGENI: PARLIAMONE CHIARO.</p>
      <h2>
        Una demo non è<br />
        una garanzia alimentare.
      </h2>
      <div class="grid gap-6 md:grid-cols-2">
        <p>
          I piatti e i prezzi indicativi sono inventati. Per ogni esempio trovi
          gli allergeni demo della ricetta: grano contenente glutine, uova,
          latte e, dove indicato, sedano.
        </p>
        <p>
          Questi dati non sono verificati per un servizio reale e non descrivono
          possibili contaminazioni. Non usarli per decidere cosa mangiare in
          caso di allergie o intolleranze: servono informazioni ufficiali
          dell’esercente.
        </p>
      </div>
      <Link class="text-link" href="/contatti/">
        Come funziona questo progetto ↗
      </Link>
    </aside>
  </>
));
export const head: DocumentHead = {
  title: "Il menu demo — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Sei assaggi di cucina italiana: antipasti, pasta fresca e dolci, con prezzi indicativi e allergeni dimostrativi. Menu editoriale, senza filtri attivi.",
    },
  ],
};
