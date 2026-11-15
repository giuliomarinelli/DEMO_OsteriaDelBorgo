import { component$ } from "@builder.io/qwik";
import type { MenuPreviewDish } from "~/content/menu-preview";

export const MenuList = component$<{ dishes: readonly MenuPreviewDish[] }>(
  ({ dishes }) => (
    <dl class="menu-list">
      {dishes.map((dish) => (
        <div class="menu-dish" key={dish.name}>
          <dt>
            <span>{dish.name}</span>
            <span class="menu-leader" aria-hidden="true" />
            <span class="dish-price">
              € {dish.price}
              <span class="sr-only">, prezzo indicativo demo</span>
            </span>
          </dt>
          <dd>
            {dish.description}
            <span class="dish-allergens">
              Allergeni demo: {dish.allergens}.
            </span>
          </dd>
        </div>
      ))}
    </dl>
  ),
);
