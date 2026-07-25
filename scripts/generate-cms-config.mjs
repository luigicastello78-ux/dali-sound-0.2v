import fs from "node:fs";
import path from "node:path";

// Regenerates public/admin/config.yml. Keep this string in sync with that
// file — running `npm run cms:config` must reproduce it byte-for-byte.
const config = `# yaml-language-server: $schema=https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json
#
# Sveltia CMS configuration for the DALI SOUND equipment catalog.
#
# LOGIN (production): open /admin, click "Sign in with Token", and paste a
# GitHub Personal Access Token (fine-grained; Contents: Read and write on this
# repo). No OAuth app or Cloudflare worker is required. See docs/CMS-SETUP.md.
#
# LOCAL EDITING: run \`npm run dev\`, open http://localhost:3000/admin/ in a
# Chromium browser (Chrome/Edge), and click "Work with Local Repository" — no
# proxy server needed. Sveltia uses the browser File System Access API to write
# directly to the files in content/. (No \`local_backend\` option is required;
# Sveltia ignores it.)

backend:
  name: github
  repo: luigicastello78-ux/dali-sound-0.2v
  branch: main

media_folder: public/uploads
public_folder: /uploads

collections:
  - name: categories
    label: Categories
    label_singular: Category
    identifier_field: name
    summary: "{{name}}  ·  {{slug}}"
    folder: content/categories
    create: true
    delete: true
    slug: "{{fields.slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: Name, name: name, widget: string }
      - {
          label: Slug,
          name: slug,
          widget: string,
          hint: "URL segment, lowercase kebab-case (e.g. keyboards). Used in the page URL and to link subcategories.",
          pattern: ["^[a-z0-9]+(?:-[a-z0-9]+)*$", "Lowercase letters, numbers and dashes only"],
        }
      - { label: Description, name: description, widget: text }
      - { label: Order, name: order, widget: number, value_type: int, default: 0, hint: "Lower numbers appear first." }
      - { label: Image, name: image, widget: image, required: false, hint: "Optional. Falls back to a category icon on the home page." }

  - name: subcategories
    label: Subcategories
    label_singular: Subcategory
    identifier_field: name
    summary: "{{name}}  ·  {{category}}/{{slug}}"
    folder: content/subcategories
    create: true
    delete: true
    slug: "{{fields.slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: Name, name: name, widget: string }
      - {
          label: Slug,
          name: slug,
          widget: string,
          hint: "URL segment, lowercase kebab-case (e.g. solo-keyboards).",
          pattern: ["^[a-z0-9]+(?:-[a-z0-9]+)*$", "Lowercase letters, numbers and dashes only"],
        }
      - {
          label: Parent category,
          name: category,
          widget: relation,
          collection: categories,
          value_field: slug,
          search_fields: [name, slug],
          display_fields: [name],
          hint: "Pick the category this subcategory belongs to.",
        }
      - { label: Description, name: description, widget: text }
      - { label: Order, name: order, widget: number, value_type: int, default: 0, hint: "Lower numbers appear first." }
      - { label: Image, name: image, widget: image, required: false }

  - name: products
    label: Products
    label_singular: Product
    identifier_field: name
    summary: "{{name}}  ·  {{subcategory}}"
    folder: content/products
    create: true
    delete: true
    slug: "{{fields.slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: Name, name: name, widget: string }
      - {
          label: Slug,
          name: slug,
          widget: string,
          hint: "URL segment, lowercase kebab-case (e.g. yamaha-cp88).",
          pattern: ["^[a-z0-9]+(?:-[a-z0-9]+)*$", "Lowercase letters, numbers and dashes only"],
        }
      - {
          label: Parent subcategory,
          name: subcategory,
          widget: relation,
          collection: subcategories,
          value_field: slug,
          search_fields: [name, slug],
          display_fields: [name],
          hint: "Pick the subcategory this product belongs to.",
        }
      - { label: Description, name: description, widget: text }
      - {
          label: Specs,
          name: specs,
          widget: list,
          field: { label: Spec, name: spec, widget: string },
          hint: "One specification per row (e.g. '88 weighted keys').",
        }
      - { label: Order, name: order, widget: number, value_type: int, default: 0, hint: "Lower numbers appear first." }
      - { label: Main image, name: image, widget: image, required: false }
      - {
          label: Gallery,
          name: gallery,
          widget: list,
          required: false,
          field: { label: Image, name: image, widget: image },
          hint: "Optional additional images.",
        }
`;

const outputPath = path.join(process.cwd(), "public/admin/config.yml");
fs.writeFileSync(outputPath, config);
console.log(`Wrote ${outputPath}`);
