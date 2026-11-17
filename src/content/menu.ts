export const menuCategories = [
  {
    id: "antipasti",
    label: "Antipasti",
    title: "Per cominciare",
    note: "Un piatto al centro. E via con le forchette.",
  },
  {
    id: "primi",
    label: "Primi",
    title: "La pasta, prima di tutto",
    note: "La sfoglia è una faccenda seria. Il pranzo, una bella scusa.",
  },
  {
    id: "secondi",
    label: "Secondi",
    title: "Il pranzo continua",
    note: "Piatti di sostanza. E il pane ancora a portata di mano.",
  },
  {
    id: "contorni",
    label: "Contorni",
    title: "Buona compagnia nel piatto",
    note: "Non chiamateli comparse: si fanno notare anche loro.",
  },
  {
    id: "dolci",
    label: "Dolci",
    title: "Uno spazio per il dolce",
    note: "Si trova sempre. Anche quando dici di no.",
  },
] as const;

export type MenuCategory = (typeof menuCategories)[number]["id"];

/** Labels describe the fictional recipe data, never a verified food-safety claim. */
export const allergenLabels = {
  glutine: "Grano (glutine)",
  uova: "Uova",
  latte: "Latte",
  sedano: "Sedano",
  solfiti: "Solfiti",
  sesamo: "Sesamo",
  molluschi: "Molluschi",
  senape: "Senape",
  pesce: "Pesce",
  soia: "Soia",
  crostacei: "Crostacei",
  "frutta-guscio": "Frutta a guscio",
} as const;

export type AllergenId = keyof typeof allergenLabels;
export const allergenIds = Object.keys(allergenLabels) as AllergenId[];

export interface MenuDish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  allergens: readonly AllergenId[];
  image?: { src: string; alt: string; caption: string };
}

export const menuDishes: readonly MenuDish[] = [
  {
    id: "crostoni-orto",
    name: "Crostoni dell’orto",
    description:
      "Pane tostato, zucca al forno, ricotta montata e salvia. Si comincia condividendo.",
    price: "9",
    category: "antipasti",
    allergens: ["glutine", "latte"],
  },
  {
    id: "polpette-sugo",
    name: "Polpette al sugo",
    description:
      "Manzo, pane e pecorino, nel sugo di pomodoro con un fondo di sedano. Il pane per la scarpetta è il consiglio della casa.",
    price: "11",
    category: "antipasti",
    allergens: ["glutine", "uova", "latte", "sedano"],
  },
  {
    id: "caponata",
    name: "Caponata da passare",
    description:
      "Melanzane, pomodoro, sedano, olive e capperi, con aceto di vino. Un agrodolce che mette d’accordo la tavola.",
    price: "8",
    category: "antipasti",
    allergens: ["sedano", "solfiti"],
  },
  {
    id: "crostino-ceci",
    name: "Crostino ceci e sesamo",
    description:
      "Pane di grano, crema di ceci al limone e tahina. Sopra, un giro d’olio e semi di sesamo tostati.",
    price: "8",
    category: "antipasti",
    allergens: ["glutine", "sesamo"],
  },
  {
    id: "tagliatelle-borgo",
    name: "Tagliatelle del Borgo",
    description:
      "Sfoglia all’uovo, pomodoro cotto piano, basilico e una bella grattugiata di parmigiano.",
    price: "14",
    category: "primi",
    allergens: ["glutine", "uova", "latte"],
    image: {
      src: "/images/pranzo-condiviso-720.webp",
      alt: "Immagine generata di tagliatelle al pomodoro al centro di una tavola condivisa.",
      caption:
        "Un’idea delle nostre tagliatelle · Immagine generata, piatto demo",
    },
  },
  {
    id: "ravioli-salvia",
    name: "Ravioli burro e salvia",
    description:
      "Pasta all’uovo con ricotta e spinaci. Fuori, burro nocciola e salvia croccante.",
    price: "15",
    category: "primi",
    allergens: ["glutine", "uova", "latte"],
  },
  {
    id: "risotto-funghi",
    name: "Risotto del sottobosco",
    description:
      "Riso con funghi, brodo al sedano e vino bianco, mantecato con burro e parmigiano. Il cucchiaio ci sta, ma anche la forchetta.",
    price: "15",
    category: "primi",
    allergens: ["latte", "sedano", "solfiti"],
  },
  {
    id: "spaghetti-vongole",
    name: "Spaghetti alle vongole",
    description:
      "Spaghetti di grano, vongole, aglio e prezzemolo, sfumati al vino bianco. Un po’ di mare nel nostro pranzo inventato.",
    price: "17",
    category: "primi",
    allergens: ["glutine", "molluschi", "solfiti"],
  },
  {
    id: "pollo-limone",
    name: "Pollo al limone e senape",
    description:
      "Coscia di pollo al forno con limone, senape dolce e vino bianco. La salsa è fatta per non restare nel piatto.",
    price: "16",
    category: "secondi",
    allergens: ["senape", "solfiti"],
  },
  {
    id: "baccala-umido",
    name: "Baccalà in umido",
    description:
      "Baccalà con pomodoro, patate, olive e un fondo di sedano. Il mestolo passa e si fa silenzio, per poco.",
    price: "19",
    category: "secondi",
    allergens: ["pesce", "sedano"],
  },
  {
    id: "polpettone-lenticchie",
    name: "Polpettone di lenticchie",
    description:
      "Lenticchie, carote e pangrattato, con una glassa di salsa di soia e senape. Una bella fetta, senza formalità.",
    price: "14",
    category: "secondi",
    allergens: ["glutine", "soia", "senape"],
  },
  {
    id: "gamberi-padella",
    name: "Gamberi in padella",
    description:
      "Gamberi saltati al burro con limone e prezzemolo. Le dita si sporcano: fa parte del pranzo.",
    price: "19",
    category: "secondi",
    allergens: ["crostacei", "latte"],
  },
  {
    id: "patate-rosmarino",
    name: "Patate al rosmarino",
    description:
      "Patate a spicchi al forno, olio d’oliva, aglio e rosmarino. Quelle croccanti finiscono sempre prima.",
    price: "5",
    category: "contorni",
    allergens: [],
  },
  {
    id: "cicoria-ripassata",
    name: "Cicoria ripassata",
    description:
      "Cicoria in padella con olio, aglio e peperoncino. Un po’ di carattere accanto al piatto principale.",
    price: "5",
    category: "contorni",
    allergens: [],
  },
  {
    id: "finocchi-arance",
    name: "Finocchi, arance e noci",
    description:
      "Finocchi croccanti, arance e noci, con una citronette alla senape. Una pausa fresca tra un boccone e l’altro.",
    price: "6",
    category: "contorni",
    allergens: ["frutta-guscio", "senape"],
  },
  {
    id: "tiramisu",
    name: "Tiramisù, punto.",
    description:
      "Savoiardi, caffè e crema al mascarpone. Il cucchiaino in più? Te lo immaginiamo già in mano.",
    price: "7",
    category: "dolci",
    allergens: ["glutine", "uova", "latte"],
  },
  {
    id: "crostata-casa",
    name: "Crostata di casa",
    description:
      "Frolla al burro e confettura di albicocche. Una fetta tagliata senza fare economia.",
    price: "6",
    category: "dolci",
    allergens: ["glutine", "uova", "latte"],
  },
  {
    id: "torta-cioccolato",
    name: "Torta cioccolato e nocciole",
    description:
      "Cioccolato fondente, burro, uova e nocciole macinate, senza farina nella ricetta demo. Il caffè lo immaginiamo a fianco.",
    price: "7",
    category: "dolci",
    allergens: ["uova", "latte", "frutta-guscio"],
  },
];

/** Stable IDs: expanding the catalog must not replace the homepage selection. */
export const featuredDishes = menuDishes.filter((dish) =>
  ["crostoni-orto", "tagliatelle-borgo", "tiramisu"].includes(dish.id),
);
