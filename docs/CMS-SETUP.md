# Sveltia CMS Setup Guide

This project uses **[Sveltia CMS](https://sveltiacms.app/)** to manage the equipment catalog. Content is stored as Markdown files in `content/` and rendered by Next.js. When you publish in the CMS it **commits and pushes to GitHub**, your host rebuilds, and the changes go live.

> **Note:** There is no Eleventy in this project. The site is Next.js, which already statically generates the equipment pages from the Markdown files. Sveltia CMS just edits those files.

## What you can manage

| Collection | Folder | Purpose |
|---|---|---|
| **Categories** | `content/categories/` | Top-level groups (Keyboards, Drums, …). You can add unlimited new ones. |
| **Subcategories** | `content/subcategories/` | Groups under a category (linked via a dropdown). |
| **Products** | `content/products/` | Individual rental items (linked to a subcategory via a dropdown). |

Relationships are chosen from **dropdowns** (the CMS lists existing categories/subcategories) — you never type a slug by hand for the parent link.

---

## A. Edit locally (no GitHub needed)

Best for building out the catalog on your machine. Sveltia CMS writes straight to the files in `content/` using the browser's **File System Access API** — no proxy server or extra config.

1. Start the site:
   ```bash
   npm run dev
   ```
2. Open **http://localhost:3000/admin/** in a **Chromium browser (Chrome or Edge)** — the File System Access API isn't available in Firefox/Safari.
3. On the login screen click **Work with Local Repository** and pick this project's folder (`dali_sound_rent`). Grant read/write when prompted.
4. Add/edit entries and click **Save**. The Markdown files under `content/` update immediately and the running dev site hot-reloads.
5. When you're happy, commit and push with git as usual.

---

## B. Edit in production with a GitHub token (PAT)

This is how you publish live edits from the deployed `/admin` — **no OAuth app or Cloudflare worker required.**

### One-time: create a GitHub token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Resource owner:** the account/org that owns the repo (`luigicastello78-ux`).
3. **Repository access:** *Only select repositories* → `dali-cursor`.
4. **Permissions → Repository permissions → Contents:** **Read and write**.
5. Set an expiration, generate, and **copy the token** (you only see it once).

### Each browser: sign in

1. Open **`/admin`** on the live site (e.g. `https://your-domain/admin/`).
2. Click **Sign in with Token**.
3. Paste the token. It's stored in that browser's local storage and used for GitHub API requests.
4. Edit content and click **Publish** → Sveltia commits to `content/**` on `main`.
5. Your host (e.g. Vercel) rebuilds on push and the catalog updates.

> Want a one-click **"Sign in with GitHub"** button instead of pasting a token? That requires deploying the [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker and adding `base_url:` to the backend config. The token flow above is simpler and recommended for a solo/small team.

---

## Content rules

### Categories
- **Name** + **Slug** (lowercase kebab-case, e.g. `keyboards`) + **Description**.
- A category only appears on the site once it has **at least one subcategory that has at least one product** (this hides empty categories). It shows automatically on the home "Everything you need on stage" section and at `/[locale]/equipment/[slug]`.
- Home-page icon: known slugs (keyboards, drums, guitars, speakers, mixers, microphones) get a matching icon; new categories get a default icon.

### Subcategories
- **Parent category** is picked from a dropdown.
- Appears once it has **at least one product**.

### Products
- **Parent subcategory** is picked from a dropdown.
- **Specs** is a list — one item per row.
- **Main image** + optional **Gallery**; uploads are saved to `public/uploads/` and served from `/uploads/...`.

---

## Where content shows up

| File pattern | Page |
|---|---|
| `content/categories/*.md` | Home section + `/[locale]/equipment` + `/[locale]/equipment/[category]` |
| `content/subcategories/*.md` | `/[locale]/equipment/[category]/[subcategory]` |
| `content/products/*.md` | `/[locale]/equipment/[category]/[subcategory]/[product]` |

---

## Maintenance scripts

| Command | Purpose |
|---|---|
| `npm run cms:config` | Regenerate `public/admin/config.yml` from `scripts/generate-cms-config.mjs`. |
| `npm run cms:seed` | Reset the sample catalog data under `content/`. |

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Category not showing | Give it ≥1 subcategory that has ≥1 product. |
| `/admin` won't save in production | Sign in with a GitHub PAT that has **Contents: Read and write** on `dali-cursor`. |
| No "Work with Local Repository" option | Use Chrome or Edge — the File System Access API isn't available in Firefox/Safari. |
| Image not showing | Upload via the CMS; the stored path should be `/uploads/<file>`. |
| Wrong repo on save | Update `repo` in `public/admin/config.yml`. |

For product requirements see [PRD.md](./PRD.md) (if present). For architecture see [Tech.md](./Tech.md).
