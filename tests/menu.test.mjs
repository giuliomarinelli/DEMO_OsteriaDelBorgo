import assert from "node:assert/strict";
import test from "node:test";
import {
  allergenIds,
  featuredDishes,
  menuCategories,
  menuDishes,
} from "../src/content/menu.ts";
import { createDefaultFilters, filterDishes } from "../src/lib/menu-filters.ts";

const dish = (id, category, allergens) => ({
  id,
  name: id,
  description: "Ricetta fittizia di prova",
  price: "10",
  category,
  allergens,
});
const fixtures = [
  dish("a", "antipasti", ["glutine", "latte"]),
  dish("b", "antipasti", ["glutine"]),
  dish("c", "primi", ["uova"]),
  dish("d", "contorni", []),
  dish("e", "secondi", ["latte", "uova"]),
  dish("f", "dolci", ["latte"]),
];
const ids = (dishes) => dishes.map((item) => item.id);

test("Nessun filtro: tutti i piatti nello stesso ordine", () => {
  assert.deepEqual(ids(filterDishes(fixtures, createDefaultFilters())), [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]);
});

for (const [category, expected] of Object.entries({
  antipasti: ["a", "b"],
  primi: ["c"],
  secondi: ["e"],
  contorni: ["d"],
  dolci: ["f"],
})) {
  test(`Categoria ${category}: solo la portata richiesta`, () => {
    assert.deepEqual(
      ids(filterDishes(fixtures, { category, excludedAllergens: [] })),
      expected,
    );
  });
}

test("Esclusione singola: basta un allergene indicato per rimuovere il piatto", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, { category: "all", excludedAllergens: ["latte"] }),
    ),
    ["b", "c", "d"],
  );
});

test("Esclusioni multiple: latte O uova, non soltanto la loro compresenza", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, {
        category: "all",
        excludedAllergens: ["latte", "uova"],
      }),
    ),
    ["b", "d"],
  );
});

test("Categoria E allergeni si combinano", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, {
        category: "antipasti",
        excludedAllergens: ["latte"],
      }),
    ),
    ["b"],
  );
});

test("Nessun risultato: categoria senza piatti compatibili con le esclusioni", () => {
  assert.deepEqual(
    filterDishes(fixtures, { category: "dolci", excludedAllergens: ["latte"] }),
    [],
  );
});

test("Allergene assente dai dati: non rimuove piatti", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, { category: "all", excludedAllergens: ["pesce"] }),
    ),
    ["a", "b", "c", "d", "e", "f"],
  );
});

test("Catalogo vuoto: risultato vuoto", () => {
  assert.deepEqual(
    filterDishes([], { category: "primi", excludedAllergens: ["latte"] }),
    [],
  );
});

test("Nessun allergene indicato: nessuna corrispondenza, senza dedurre sicurezza", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, {
        category: "all",
        excludedAllergens: [...allergenIds],
      }),
    ),
    ["d"],
  );
});

test("Ripetere un’esclusione non cambia il risultato", () => {
  assert.deepEqual(
    ids(
      filterDishes(fixtures, {
        category: "all",
        excludedAllergens: ["latte", "latte"],
      }),
    ),
    ["b", "c", "d"],
  );
});

test("Catalogo e selezione non vengono mutati dalla funzione", () => {
  const source = Object.freeze(
    fixtures.map((item) =>
      Object.freeze({ ...item, allergens: Object.freeze([...item.allergens]) }),
    ),
  );
  const filters = Object.freeze({
    category: "all",
    excludedAllergens: Object.freeze(["latte"]),
  });
  const before = JSON.stringify({ source, filters });
  assert.deepEqual(ids(filterDishes(source, filters)), ["b", "c", "d"]);
  assert.equal(JSON.stringify({ source, filters }), before);
});

test("Reset: stato nuovo e completo, indipendente fra componenti e richieste SSR", () => {
  const active = createDefaultFilters();
  active.category = "dolci";
  active.excludedAllergens.push("latte");
  assert.equal(filterDishes(fixtures, active).length, 0);
  const reset = createDefaultFilters();
  assert.deepEqual(reset, { category: "all", excludedAllergens: [] });
  assert.equal(filterDishes(fixtures, reset).length, fixtures.length);
  assert.notStrictEqual(active.excludedAllergens, reset.excludedAllergens);
});

test("Catalogo: almeno 16 piatti, cinque portate e almeno tre voci per portata", () => {
  assert.ok(menuDishes.length >= 16);
  assert.deepEqual(
    menuCategories.map((category) => category.id),
    ["antipasti", "primi", "secondi", "contorni", "dolci"],
  );
  for (const category of menuCategories)
    assert.ok(
      menuDishes.filter((item) => item.category === category.id).length >= 3,
      category.id,
    );
});

test("Dati coerenti: ID univoci, descrizioni, prezzi e allergeni riconosciuti", () => {
  assert.equal(new Set(ids(menuDishes)).size, menuDishes.length);
  for (const item of menuDishes) {
    assert.ok(item.description.length >= 40, item.id);
    assert.ok(Number(item.price) > 0, item.id);
    assert.ok(
      menuCategories.some((category) => category.id === item.category),
      item.id,
    );
    assert.equal(new Set(item.allergens).size, item.allergens.length, item.id);
    for (const allergen of item.allergens)
      assert.ok(allergenIds.includes(allergen), `${item.id}: ${allergen}`);
  }
});

test("La selezione della homepage rimane quella della milestone 2", () => {
  assert.deepEqual(ids(featuredDishes), [
    "crostoni-orto",
    "tagliatelle-borgo",
    "tiramisu",
  ]);
});
