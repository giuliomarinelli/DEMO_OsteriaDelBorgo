import type { AllergenId, MenuCategory, MenuDish } from "../content/menu";

export interface MenuFilters {
  category: MenuCategory | "all";
  excludedAllergens: AllergenId[];
}

/** Each component/request gets independent state, including after reset. */
export function createDefaultFilters(): MenuFilters {
  return { category: "all", excludedAllergens: [] };
}

/** Category AND exclusions; matching any excluded allergen removes the dish. */
export function filterDishes(
  dishes: readonly MenuDish[],
  filters: Readonly<MenuFilters>,
): MenuDish[] {
  return dishes.filter(
    (dish) =>
      (filters.category === "all" || dish.category === filters.category) &&
      !dish.allergens.some((allergen) =>
        filters.excludedAllergens.includes(allergen),
      ),
  );
}
