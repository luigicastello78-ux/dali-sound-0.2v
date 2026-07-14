import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

const ensureDir = (folder) => {
  const dir = path.join(contentDir, folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const writeEntry = (folder, slug, data) => {
  ensureDir(folder);
  const filePath = path.join(contentDir, folder, `${slug}.md`);
  fs.writeFileSync(filePath, matter.stringify("", data));
};

const categories = [
  {
    slug: "keyboards",
    order: 1,
    name: "Keyboards",
    description: "Stage pianos, arrangers, and synths for live performance.",
  },
  {
    slug: "drums",
    order: 2,
    name: "Drums",
    description: "Acoustic and electronic kits for rehearsals and events.",
  },
  {
    slug: "guitars",
    order: 3,
    name: "Guitars",
    description: "Electric and acoustic guitars, amps, and accessories.",
  },
  {
    slug: "speakers",
    order: 4,
    name: "Speakers",
    description: "PA systems, subwoofers, and monitors for any venue size.",
  },
  {
    slug: "mixers",
    order: 5,
    name: "Mixers",
    description: "Analog and digital consoles for live sound and recording.",
  },
  {
    slug: "microphones",
    order: 6,
    name: "Microphones",
    description: "Vocal, instrument, and wireless mics for stage and events.",
  },
];

const subcategories = [
  {
    slug: "solo-keyboards",
    category: "keyboards",
    order: 1,
    name: "Solo Keyboards",
    description: "Stage pianos and performance keyboards.",
  },
  {
    slug: "arranger-keyboards",
    category: "keyboards",
    order: 2,
    name: "Arranger Keyboards",
    description: "All-in-one keyboards with built-in accompaniment.",
  },
  {
    slug: "acoustic-drums",
    category: "drums",
    order: 1,
    name: "Acoustic Drums",
    description: "Full acoustic kits for live events.",
  },
  {
    slug: "electronic-drums",
    category: "drums",
    order: 2,
    name: "Electronic Drums",
    description: "Compact electronic kits for tight stages.",
  },
  {
    slug: "electric-guitars",
    category: "guitars",
    order: 1,
    name: "Electric Guitars",
    description: "Solid-body and semi-hollow electric guitars.",
  },
  {
    slug: "acoustic-guitars",
    category: "guitars",
    order: 2,
    name: "Acoustic Guitars",
    description: "Steel-string and classical acoustic guitars.",
  },
  {
    slug: "pa-systems",
    category: "speakers",
    order: 1,
    name: "PA Systems",
    description: "Main PA speakers and subwoofers.",
  },
  {
    slug: "stage-monitors",
    category: "speakers",
    order: 2,
    name: "Stage Monitors",
    description: "Floor and side-fill monitors for performers.",
  },
  {
    slug: "analog-mixers",
    category: "mixers",
    order: 1,
    name: "Analog Mixers",
    description: "Reliable analog mixing consoles.",
  },
  {
    slug: "digital-mixers",
    category: "mixers",
    order: 2,
    name: "Digital Mixers",
    description: "Digital consoles with recall and effects.",
  },
  {
    slug: "vocal-microphones",
    category: "microphones",
    order: 1,
    name: "Vocal Microphones",
    description: "Dynamic and condenser mics for vocals.",
  },
  {
    slug: "wireless-systems",
    category: "microphones",
    order: 2,
    name: "Wireless Systems",
    description: "Wireless handheld and bodypack systems.",
  },
];

const products = [
  {
    slug: "yamaha-cp88",
    subcategory: "solo-keyboards",
    order: 1,
    name: "Yamaha CP88",
    description:
      "Professional stage piano with weighted keys and premium piano samples.",
    specs:
      "- 88 weighted keys\n- Three premium sound engines\n- Built-in speakers\n- XLR outputs",
  },
  {
    slug: "pearl-export",
    subcategory: "acoustic-drums",
    order: 1,
    name: "Pearl Export Series",
    description: "Versatile 5-piece acoustic drum kit for live events.",
    specs:
      "- 5-piece shell pack\n- Hardware available on request\n- Suitable for small to medium stages",
  },
  {
    slug: "fender-player-strat",
    subcategory: "electric-guitars",
    order: 1,
    name: "Fender Player Stratocaster",
    description: "Classic electric guitar for stage and session work.",
    specs: "- Alder body\n- Maple neck\n- Includes gig bag on request",
  },
  {
    slug: "qsc-k12-2",
    subcategory: "pa-systems",
    order: 1,
    name: "QSC K12.2",
    description: "Active 12-inch PA speaker for events and live sound.",
    specs:
      "- 2000 W peak power\n- 12-inch woofer\n- Pole mount compatible",
  },
  {
    slug: "yamaha-mg16x",
    subcategory: "analog-mixers",
    order: 1,
    name: "Yamaha MG16XU",
    description: "16-channel analog mixer with USB and built-in effects.",
    specs: "- 16 inputs\n- SPX effects\n- USB audio interface",
  },
  {
    slug: "shure-sm58",
    subcategory: "vocal-microphones",
    order: 1,
    name: "Shure SM58",
    description: "Industry-standard dynamic vocal microphone.",
    specs: "- Cardioid pattern\n- Legendary durability\n- Includes clip",
  },
];

for (const category of categories) {
  writeEntry("categories", category.slug, {
    slug: category.slug,
    name: category.name,
    description: category.description,
    order: category.order,
    image: "",
  });
}

for (const subcategory of subcategories) {
  writeEntry("subcategories", subcategory.slug, {
    slug: subcategory.slug,
    name: subcategory.name,
    description: subcategory.description,
    category: subcategory.category,
    order: subcategory.order,
    image: "",
  });
}

for (const product of products) {
  writeEntry("products", product.slug, {
    slug: product.slug,
    name: product.name,
    description: product.description,
    specs: product.specs,
    subcategory: product.subcategory,
    order: product.order,
    image: "",
  });
}

console.log("Catalog seed content generated.");
