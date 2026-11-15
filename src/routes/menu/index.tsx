import { $, component$, useComputed$, useStore } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/page-intro/page-intro";
import { MenuList } from "~/components/menu-list/menu-list";
import {
  allergenIds,
  allergenLabels,
  menuCategories,
  menuDishes,
} from "~/content/menu";
import { createDefaultFilters, filterDishes } from "~/lib/menu-filters";

export default component$(() => {
  const filters = useStore(createDefaultFilters());
  const results = useComputed$(() => filterDishes(menuDishes, filters));
  const hasFilters = useComputed$(
    () => filters.category !== "all" || filters.excludedAllergens.length > 0,
  );
  const resetFilters = $(() => {
    filters.category = "all";
    filters.excludedAllergens = [];
  });

  return (
    <>
      <PageIntro
        number="02 /"
        eyebrow="IL MENU DEL BORGO"
        title="Prima si legge. Poi viene fame."
      >
        <p>
          Sugo lento, pasta fresca e il dolce «da dividere». Diciotto piatti
          inventati, cinque portate e un menu da sfogliare a modo tuo.
        </p>
      </PageIntro>

      <aside
        class="shell menu-warning"
        id="menu-demo-warning"
        aria-label="Avvertenza sui dati dimostrativi"
      >
        <p>
          <strong>
            Piatti, prezzi e allergeni sono demo. I filtri non sono una garanzia
            alimentare.
          </strong>
        </p>
        <p>
          Nascondiamo solo i piatti che indicano gli allergeni selezionati nei
          dati fittizi. Dati incompleti e possibili contaminazioni non sono
          verificati. Non usarli per decidere cosa mangiare in caso di allergie
          o intolleranze: servono informazioni ufficiali dell’esercente.
        </p>
      </aside>

      <section class="shell menu-filters" aria-labelledby="titolo-filtri">
        <div class="filter-heading">
          <div>
            <p class="eyebrow">IL PRANZO SI SFOGLIA COSÌ</p>
            <h2 id="titolo-filtri">Fai un giro tra i piatti.</h2>
          </div>
          <a class="text-link" href="#risultati-menu">
            Vai ai risultati <span aria-hidden="true">↓</span>
          </a>
        </div>
        <noscript>
          <p class="no-script-note">
            Il menu completo e gli allergeni sono leggibili senza JavaScript.
            Per usare i filtri occorre attivarlo.
          </p>
        </noscript>
        <div class="menu-filter-fields">
          <fieldset aria-describedby="category-help">
            <legend>1. Scegli una portata</legend>
            <p id="category-help" class="filter-help">
              Una alla volta, oppure tutto il pranzo.
            </p>
            <div class="filter-options category-options">
              <label class="filter-choice">
                <input
                  type="radio"
                  name="menu-category"
                  value="all"
                  checked={filters.category === "all"}
                  onChange$={(_, element) => {
                    if (element.checked) filters.category = "all";
                  }}
                />
                <span>Tutte le portate</span>
              </label>
              {menuCategories.map((category) => (
                <label class="filter-choice" key={category.id}>
                  <input
                    type="radio"
                    name="menu-category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange$={(_, element) => {
                      if (element.checked) filters.category = category.id;
                    }}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset aria-describedby="allergen-help menu-demo-warning">
            <legend>2. Escludi i piatti che indicano questi allergeni</legend>
            <p id="allergen-help" class="filter-help">
              Puoi scegliere più voci. Basta una corrispondenza nei dati per
              nascondere un piatto.
            </p>
            <div class="filter-options allergen-options">
              {allergenIds.map((allergen) => (
                <label class="filter-choice" key={allergen}>
                  <input
                    type="checkbox"
                    name="excluded-allergens"
                    value={allergen}
                    checked={filters.excludedAllergens.includes(allergen)}
                    onChange$={(_, element) => {
                      filters.excludedAllergens = element.checked
                        ? [...filters.excludedAllergens, allergen]
                        : filters.excludedAllergens.filter(
                            (id) => id !== allergen,
                          );
                    }}
                  />
                  <span>{allergenLabels[allergen]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div class="filter-summary">
          <div>
            <p
              id="menu-result-count"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              class="result-count"
            >
              {results.value.length === 0
                ? "Nessun piatto mostrato"
                : `${results.value.length} ${results.value.length === 1 ? "piatto mostrato" : "piatti mostrati"}`}{" "}
              su {menuDishes.length}
            </p>
            <p class="filter-help">
              {hasFilters.value
                ? "Filtri attivi: portata ed esclusioni si combinano."
                : "Nessun filtro attivo. Qui sotto c’è tutto il menu."}
            </p>
          </div>
          <button
            class="button menu-reset"
            type="button"
            disabled={!hasFilters.value}
            onClick$={resetFilters}
          >
            Azzera tutti i filtri <span aria-hidden="true">↺</span>
          </button>
        </div>
      </section>

      <div
        class="shell menu-sheet"
        id="risultati-menu"
        tabIndex={-1}
        role="region"
        aria-label="Piatti del menu demo"
      >
        <div class="menu-sheet-top">
          <span>OSTERIA DEL BORGO</span>
          <span>MENU DIGITALE · PREZZI INDICATIVI DEMO</span>
        </div>
        {results.value.length > 0 ? (
          menuCategories.map((category, index) => {
            const dishes = results.value.filter(
              (dish) => dish.category === category.id,
            );
            return dishes.length > 0 ? (
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
                <MenuList dishes={dishes} showImages />
              </section>
            ) : null;
          })
        ) : (
          <div class="menu-empty">
            <p class="eyebrow">FACCIAMO UN ALTRO GIRO?</p>
            <h2>Qui il piatto è vuoto.</h2>
            <p>
              Nessun piatto corrisponde a questa combinazione. Cambia portata,
              modifica le esclusioni oppure riparti dal menu completo.
            </p>
            <p class="filter-help">
              Un risultato, o la sua assenza, non dà indicazioni di sicurezza
              alimentare.
            </p>
            <button type="button" class="button" onClick$={resetFilters}>
              Ripristina il menu completo <span aria-hidden="true">↺</span>
            </button>
          </div>
        )}
        <p class="menu-sheet-bottom">
          Il bis non è un obbligo. È un’opinione molto diffusa.
        </p>
      </div>

      <aside
        class="shell section-space allergy-note"
        aria-labelledby="legenda-allergeni"
      >
        <p class="eyebrow">ALLERGENI: PARLIAMONE CHIARO.</p>
        <h2 id="legenda-allergeni">
          Una demo non è<br />
          una garanzia alimentare.
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <p>
            Gli allergeni restano scritti accanto a ogni piatto mostrato.
            «Nessuno indicato» significa solo che la ricetta fittizia non ha
            voci associate: non prova l’assenza reale di allergeni o
            contaminazioni.
          </p>
          <p>
            I filtri consultano un elenco inventato e non verificato. Piatti e
            prezzi indicativi non sono una proposta commerciale; per un pasto
            reale e per allergie o intolleranze occorrono informazioni ufficiali
            dell’esercente.
          </p>
        </div>
        <p class="allergen-legend">
          <strong>Voci presenti nei dati demo:</strong>{" "}
          {allergenIds.map((id) => allergenLabels[id]).join(" · ")}.
        </p>
        <Link class="text-link" href="/contatti/">
          Come funziona questo progetto ↗
        </Link>
      </aside>
    </>
  );
});

export const head: DocumentHead = {
  title: "Il menu interattivo demo — Osteria del Borgo",
  meta: [
    {
      name: "description",
      content:
        "Diciotto piatti italiani fittizi tra antipasti, primi, secondi, contorni e dolci. Filtra per portata ed escludi allergeni nei dati demo, senza garanzie alimentari.",
    },
  ],
};
