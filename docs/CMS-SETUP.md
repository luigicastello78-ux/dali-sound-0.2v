# Sveltia CMS Setup Guide

This project uses **Sveltia CMS** to manage the equipment catalog. Content is stored as Markdown files in `content/` and deployed with the site.

## What you can manage in CMS

| Collection | Folder | Purpose |
|---|---|---|
| **Categories** | `content/categories/` | Keyboards, Drums, Guitars, Speakers, Mixers, Microphones |
| **Subcategories** | `content/subcategories/` | Groups under each category (must link to a category slug) |
| **Products** | `content/products/` | Individual rental items (must link to a subcategory slug) |

Each entry uses simple **Name** and **Description** fields (plus **Specs** for products). The same text is shown on the site in all languages.

---

## Step 1 — Open the CMS admin locally

1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Open: [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html)

> **Note:** Without GitHub OAuth configured, saving from `/admin` in production requires the auth worker (Step 3). Locally you can also edit Markdown files directly in `content/`.

---

## Step 2 — Verify GitHub repo settings

CMS config lives at `public/admin/config.yml`.

Current backend:

```yaml
backend:
  name: github
  repo: luigicastello78-ux/dali-cursor
  branch: main
```

**If your GitHub repo name differs**, update `repo` to match your repository (`owner/repo-name`).

---

## Step 3 — Enable GitHub OAuth for production editing (required for `/admin` saves)

Sveltia needs a GitHub OAuth proxy to commit changes from the browser.

1. Deploy a [Sveltia CMS GitHub OAuth worker](https://sveltia.com/cms/) (Cloudflare Workers is common).
2. In `public/admin/config.yml`, uncomment and set:
   ```yaml
   base_url: https://YOUR-AUTH-WORKER.workers.dev
   auth_methods: [oauth]
   ```
3. Regenerate config if needed:
   ```bash
   npm run cms:config
   ```
4. Commit and deploy.

Until OAuth is set up, you can still:
- Edit files in `content/` directly in the repo
- Run `npm run cms:seed` to reset sample catalog data

---

## Step 4 — Content structure rules

### Categories
- **Slug** must be one of: `keyboards`, `drums`, `guitars`, `speakers`, `mixers`, `microphones`
- Must have **at least one subcategory** with products before it appears on the site

### Subcategories
- **Category slug** must match an existing category (e.g. `keyboards`)
- Must have **at least one product** before it appears on the site

### Products
- **Subcategory slug** must match an existing subcategory (e.g. `solo-keyboards`)
- **One main image** per product (upload via CMS → saved to `public/uploads/`)
- **Specs** — one item per line (use `- item` format or plain lines)
- No price or availability fields (quote-only model)

---

## Step 5 — Add your real catalog content

Recommended order:

1. Create / edit **6 categories**
2. Add **subcategories** for each category
3. Add **products** under each subcategory (Name, Description, Specs)
4. Upload product images via CMS
5. Commit → Vercel rebuilds → changes go live

### Sample seed data (already included)

The repo includes starter content you can edit or replace:

```bash
npm run cms:seed
```

This regenerates sample categories, 12 subcategories, and 6 products.

---

## Step 6 — After you save in CMS

1. Sveltia commits Markdown to GitHub (`content/**/*.md`)
2. Vercel rebuilds on push to `main`
3. Catalog pages update automatically:
   - `/[locale]/equipment`
   - `/[locale]/equipment/[category]`
   - `/[locale]/equipment/[category]/[subcategory]`
   - `/[locale]/equipment/[category]/[subcategory]/[product]`

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Category not showing on homepage | Ensure it has ≥1 subcategory with ≥1 product |
| `/admin` save fails | Set up GitHub OAuth (Step 3) |
| Image not showing | Upload via CMS; path should be `/uploads/filename.jpg` |
| Wrong repo on save | Update `repo` in `public/admin/config.yml` |
| Need to reset sample data | Run `npm run cms:seed` |

---

## Your action checklist

- [ ] Confirm `public/admin/config.yml` → `repo` matches your GitHub repo
- [ ] Deploy OAuth worker and enable `base_url` for production CMS access
- [ ] Replace sample catalog content with your real gear
- [ ] Upload product/category images to `public/uploads/`
- [ ] Push to `main` and verify catalog on the live site

For product requirements see [PDR.md](./PDR.md). For architecture see [Tech.md](./Tech.md).
