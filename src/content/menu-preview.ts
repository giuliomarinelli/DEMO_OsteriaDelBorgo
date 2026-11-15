/** Six editorial samples for the visual menu, not the future interactive catalog. */
export interface MenuPreviewDish {
  name: string;
  description: string;
  price: string;
  category: "antipasti" | "primi" | "dolci";
  allergens: string;
}

export const menuPreview: readonly MenuPreviewDish[] = [
  {
    name: "Crostoni dell’orto",
    description:
      "Pane tostato, zucca al forno, ricotta montata e salvia. Si comincia condividendo.",
    price: "9",
    category: "antipasti",
    allergens: "Grano (glutine), latte",
  },
  {
    name: "Polpette al sugo",
    description:
      "Manzo, pane e pecorino, nel sugo di pomodoro. Il pane per la scarpetta è il consiglio della casa.",
    price: "11",
    category: "antipasti",
    allergens: "Grano (glutine), uova, latte, sedano",
  },
  {
    name: "Tagliatelle del Borgo",
    description:
      "Sfoglia all’uovo, pomodoro cotto piano, basilico e una bella grattugiata di parmigiano.",
    price: "14",
    category: "primi",
    allergens: "Grano (glutine), uova, latte",
  },
  {
    name: "Ravioli burro e salvia",
    description:
      "Pasta all’uovo con ricotta e spinaci. Fuori, burro nocciola e salvia croccante.",
    price: "15",
    category: "primi",
    allergens: "Grano (glutine), uova, latte",
  },
  {
    name: "Tiramisù, punto.",
    description:
      "Savoiardi, caffè e crema al mascarpone. Il cucchiaino in più? Te lo immaginiamo già in mano.",
    price: "7",
    category: "dolci",
    allergens: "Grano (glutine), uova, latte",
  },
  {
    name: "Crostata di casa",
    description:
      "Frolla al burro e confettura di albicocche. Una fetta tagliata senza fare economia.",
    price: "6",
    category: "dolci",
    allergens: "Grano (glutine), uova, latte",
  },
];
