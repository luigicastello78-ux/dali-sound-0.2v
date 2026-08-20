/**
 * Downloads cover images for CMS categories/subcategories and updates frontmatter.
 * Images are sourced from Pexels (free to use under the Pexels License).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=750&fit=crop`;

/** slug -> Pexels photo id */
const COVERS = {
  categories: {
    keyboards: pexels(164745),
    drums: pexels(18759178),
    guitars: pexels(2109109),
    speakers: pexels(1251746),
    mixers: pexels(33379549),
    microphones: pexels(3756766),
  },
  subcategories: {
    "solo-keyboards": pexels(164745),
    "arranger-keyboards": pexels(7802593),
    "workstation-keyboards": pexels(12409937),
    "acoustic-drums": pexels(1327430),
    "electronic-drums": pexels(7887166),
    "electric-guitars": pexels(2109109),
    "acoustic-guitars": pexels(4988136),
    "pa-systems": pexels(33565506),
    "stage-monitors": pexels(30958195),
    "analog-mixers": pexels(35307143),
    "digital-mixers": pexels(33379549),
    "wired-microphones": pexels(4717873),
    "vocal-microphones": pexels(9010078),
    "wireless-microphones": pexels(16108225),
    "wireless-systems": pexels(21773663),
  },
};

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const download = async (url, dest) => {
  const response = await fetch(url, {
    headers: { "User-Agent": "dali-sound-catalog-setup/1.0" },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`  saved ${path.relative(root, dest)} (${buffer.length} bytes)`);
};

const updateFrontmatterImage = (filePath, imagePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content.replace(/^image:.*$/m, `image: ${imagePath}`);

  if (updated === content) {
    throw new Error(`Could not update image field in ${filePath}`);
  }

  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`  updated ${path.relative(root, filePath)}`);
};

const run = async () => {
  for (const [kind, items] of Object.entries(COVERS)) {
    const uploadDir = path.join(root, "public", "uploads", kind);
    const contentDir = path.join(root, "content", kind);
    ensureDir(uploadDir);

    console.log(`\n${kind}:`);

    for (const [slug, url] of Object.entries(items)) {
      const filename = `${slug}.jpg`;
      const dest = path.join(uploadDir, filename);
      const publicPath = `/uploads/${kind}/${filename}`;
      const mdPath = path.join(contentDir, `${slug}.md`);

      if (!fs.existsSync(mdPath)) {
        console.warn(`  skip ${slug}: missing ${mdPath}`);
        continue;
      }

      await download(url, dest);
      updateFrontmatterImage(mdPath, publicPath);
    }
  }

  console.log("\nDone.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
