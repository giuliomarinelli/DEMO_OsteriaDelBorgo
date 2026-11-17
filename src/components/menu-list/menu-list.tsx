import { component$ } from "@builder.io/qwik";
import { allergenLabels, type MenuDish } from "~/content/menu";

export const MenuList = component$<{
  dishes: readonly MenuDish[];
  showImages?: boolean;
}>((props) => (
  <dl class="menu-list">
    {props.dishes.map((dish) => (
      <div class="menu-dish" key={dish.id} data-dish-id={dish.id}>
        <dt>
          <span>{dish.name}</span>
          <span class="menu-leader" aria-hidden="true" />
          <span class="dish-price">
            € {dish.price}
            <span class="sr-only">, prezzo indicativo demo</span>
          </span>
        </dt>
        <dd
          class={{
            "dish-content-with-image": props.showImages && !!dish.image,
          }}
        >
          <div>
            {dish.description}
            <span class="dish-allergens">
              Allergeni demo:{" "}
              {dish.allergens.length
                ? `${dish.allergens.map((id) => allergenLabels[id]).join(", ")}.`
                : "nessuno indicato nella ricetta fittizia; non esclude contaminazioni."}
            </span>
          </div>
          {props.showImages && dish.image && (
            <figure class="dish-image">
              <img
                src={dish.image.src}
                width="720"
                height="480"
                loading="lazy"
                alt={dish.image.alt}
              />
              <figcaption>{dish.image.caption}</figcaption>
            </figure>
          )}
        </dd>
      </div>
    ))}
  </dl>
));
