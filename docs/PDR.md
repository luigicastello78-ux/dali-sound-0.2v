# Product Requirements Document (PRD)

## DALI SOUND — Instrument & Speaker Rental Platform

**Version:** 1.0 (locked)  
**Last updated:** July 2026  
**Status:** Ready for implementation

---

## 1. Executive summary

DALI SOUND is a marketing and catalog website for renting musical instruments and professional sound equipment. The platform serves customers in **Switzerland, Germany, and France**, supports **12 languages**, and is powered by a **Sveltia CMS** catalog so the site owner can manage equipment without developer involvement.

The site is **quote-led**: visitors browse equipment and submit a request form. There is **no online booking, payment, inventory calendar, or customer login** in v1. The business confirms quotes manually by email or phone.

---

## 2. Goals & success criteria

### Business goals

- Present a professional, trustworthy rental brand across three European markets.
- Let the client add, edit, and remove catalog content independently via CMS.
- Capture qualified leads through a structured inquiry form.
- Support 12 languages for pan-European reach.

### v1 success criteria (“done”)

- [ ] Live public site with locale-prefixed URLs (`/en/`, `/de/`, …).
- [ ] First-visit language selection gate.
- [ ] Full catalog navigation: Category → Subcategory → Product list → Product detail.
- [ ] Six fixed equipment categories populated from Sveltia CMS.
- [ ] Static past-events gallery (6 example tiles at launch).
- [ ] Inquiry form sends email to a single business inbox.
- [ ] Thank-you page after successful form submission.
- [ ] Responsive layout on mobile, tablet, and desktop.
- [ ] Placeholder legal pages (Privacy, Terms, Impressum).

---

## 3. Target users

| User | Needs |
|---|---|
| **Event organizers / renters** | Browse gear, understand the rental process, request a quote. |
| **Site owner (admin)** | Manage categories, subcategories, and products in Sveltia CMS without code changes. |

There are **no end-user accounts** in v1.

---

## 4. Scope

### In scope (v1)

- Multi-language marketing site (12 languages).
- CMS-driven equipment catalog (3 collection levels).
- Homepage with defined sections (see §7).
- Sticky header with navigation and “Get a quote” CTA.
- Contact / inquiry form with email delivery.
- Static FAQ, footer, and contact details.
- Static past-events gallery (launch examples).
- Placeholder legal pages.
- Dark theme with orange accent (match previous site design).

### Out of scope (v1)

- Online payments or deposits.
- Availability status or inventory calendar on products.
- Public pricing (all pricing is “on request” via quote).
- Customer accounts or login.
- Search and filters in the catalog.
- Packages / bundles section and nav item.
- Separate “Events” section or nav (gallery covers past events).
- Product-level “Request this item” or form prefill.
- n8n, CRM, or database storage of leads.
- Auto-reply email to the submitter.
- CMS-editable FAQ, footer, homepage marketing copy, or gallery.

---

## 5. Markets & delivery

- **Delivery countries:** Switzerland (CH), Germany (DE), France (FR) only.
- Delivery and on-site setup are described in **marketing copy** on the site.
- Specific logistics, pricing, and availability are handled **manually in quote replies** — not calculated or confirmed on the website.

---

## 6. Languages & localization

### Supported languages (12)

English, German, French, Italian, Spanish, Dutch, Serbian, Macedonian, Bulgarian, Greek, Romanian, Polish.

**Locale codes (planned):** `en`, `de`, `fr`, `it`, `es`, `nl`, `sr`, `mk`, `bg`, `el`, `ro`, `pl`.

### Language behavior

| Requirement | Detail |
|---|---|
| **First visit** | Full-screen language selection before entering the site. |
| **Default language** | English (`en`). |
| **URL structure** | Locale prefix on all pages: `/en/`, `/de/`, `/fr/`, etc. |
| **Persistence** | Selected language stored (cookie) so repeat visits respect the choice. |
| **Switcher** | Header language selector to change locale at any time. |
| **CMS content** | Category names, subcategory names, product names, descriptions, and specs must be translatable in all 12 languages at launch. |
| **UI strings** | All labels, buttons, nav, and static section copy translated in all 12 languages. |
| **Content ownership** | Client provides final copy and images for all languages before launch. |

---

## 7. Information architecture

### 7.1 Navigation (header)

**Included links:**

- Equipment (categories / catalog entry)
- How it works
- Gallery
- Why us
- FAQ
- Contact
- Language switcher
- **Get a quote** (primary CTA)

**Excluded from v1:**

- Packages
- Events (as a separate page/section)

Header is **sticky**. “Get a quote” and similar CTAs **smooth-scroll to the contact form** — no prefill.

### 7.2 Catalog hierarchy

```
Home
 └── Category (6 fixed top-level categories)
      └── Subcategory (≥1 required per category)
           └── Product listing
                └── Product detail
```

**Fixed categories (v1):**

1. Keyboards  
2. Drums  
3. Guitars  
4. Speakers  
5. Mixers  
6. Microphones  

**Rules:**

- Every category must have **at least one subcategory** before products can appear.
- Products belong to exactly one subcategory.
- **Browse only** — no search, no filters in v1.
- Product detail pages are **informational only**; users request quotes via the shared contact form at the bottom of the site.

### 7.3 Product fields

| Field | Required | Notes |
|---|---|---|
| Name | Yes | Localized per language |
| Main image | Yes | **One image per product** |
| Short description | Yes | Localized |
| Specs | Yes | Localized (structured or markdown) |
| Price | No | Not shown in v1 |
| Availability | No | Not used in v1 |

---

## 8. CMS requirements (Sveltia)

### 8.1 Admin model

- **Single admin** (site owner) manages content in **Sveltia CMS** (`/admin`).
- Developers build the **public Next.js frontend** only; no custom admin panel in v1.
- Content is stored in the Git repository (Markdown + frontmatter) and deployed with the site.

### 8.2 Collections (v1)

| Collection | Purpose | Key fields |
|---|---|---|
| **Categories** | Top-level equipment groups | name, icon/image, slug, description |
| **Subcategories** | Grouping under a category | name, image, slug, parent category reference |
| **Products** | Individual rental items | name, image, short description, specs, parent subcategory |

All three levels must be **independently add/edit/remove** from the CMS admin.

### 8.3 Not CMS-managed in v1

- FAQ items  
- Footer links and contact block  
- Homepage hero / “How it works” / “Why us” copy  
- Past events gallery images  
- Legal page body text (placeholders until final copy)

---

## 9. Page specifications

### 9.1 Language gate

- Shown on first visit (before homepage).
- User picks one of 12 languages.
- Redirect to `/[locale]/` homepage.
- Not shown again once language is stored (unless cookie cleared).

### 9.2 Homepage sections

1. **Hero** — Headline, supporting text, primary CTA (“Get a free quote”), secondary CTA (“Browse equipment”), trust stats (e.g. events powered, gear count, years of experience), hero visual.
2. **Equipment categories** — Grid of 6 CMS-driven category cards. Intro: “Everything you need on stage.” Each card links to its category page.
3. **How it works** — 4-step process: Tell us about your event → Get a tailored quote → We deliver & set up → Enjoy the show.
4. **Why choose us** — 4 value propositions (e.g. pro-grade gear, delivery & setup, on-site support, regional coverage).
5. **Past events gallery** — **6 static example tiles** at launch (not CMS). Builds trust with sample event types.
6. **FAQ** — Accordion; static content in code.
7. **Contact / inquiry** — Form + static contact block (phone, email, address — same details in every language).

### 9.3 Category page

- Category name, description, image/icon.
- Grid of subcategory cards linking to subcategory product listings.

### 9.4 Subcategory page (product listing)

- Subcategory name and description.
- Grid/list of products in that subcategory.
- Each product links to product detail.

### 9.5 Product detail page

- Product name, main image, short description, specs.
- No price, no availability, no “Add to quote” or pre-filled form.
- Optional site-wide CTA to scroll to contact form (no product data passed).

### 9.6 Thank-you page

- Shown after successful form submission.
- Confirms request was sent; sets expectation for manual follow-up.

### 9.7 Legal pages (placeholders)

- Privacy Policy  
- Terms of Service  
- Impressum (required for DE/CH compliance)

Placeholder content until client or legal counsel provides final text.

---

## 10. Inquiry form

### 10.1 Fields

| Field | Required | Type |
|---|---|---|
| Full name | Yes | Text |
| Email | Yes | Email |
| Phone | Yes | Tel |
| Event date | Yes | Date picker |
| Country | Yes | Select: Switzerland, Germany, France |
| Message | Yes | Textarea |

**Not included:** event type dropdown, product prefill, package prefill.

### 10.2 Behavior

- Client-side and server-side validation.
- On success: send email to **one fixed business inbox** → redirect or navigate to **thank-you page**.
- On failure: show inline error; do not lose form data unnecessarily.
- **No prefill** from product pages, package cards, or URL parameters.

### 10.3 Lead handling

- Email notification to site owner only (via Resend).
- Manual follow-up by staff (quote, confirm, book offline).
- No CRM, database, or automation integration in v1.

---

## 11. Design & UX

### Visual direction

- Reuse layout inspiration from the previous DALI SOUND site.
- **Dark theme** with **orange accent** for CTAs, icons, and highlights.
- Card-based grids for categories and gallery.
- Numbered steps for “How it works”.
- Accordion FAQ.
- Reference screenshot: previous Vercel deployment (dark layout, orange buttons, section order).

### UX principles

- Professional B2B/event rental tone.
- Clear hierarchy and generous whitespace.
- Mobile-first responsive design.
- Accessible forms (labels, errors, focus states).
- Smooth-scroll from CTAs to contact section.

### Contact block (beside form)

- Static in code.
- Same phone, email, and address in **all languages** (not localized per locale unless client requests later).

---

## 12. Content checklist (client deliverables)

Before launch, the client provides:

- [ ] Final copy for all 12 languages (UI + CMS fields).
- [ ] Category, subcategory, and product content in Sveltia.
- [ ] Product images (one per product).
- [ ] Category/subcategory images or icons.
- [ ] 6 gallery example images (or approval of placeholders).
- [ ] Business contact details (phone, email, physical address).
- [ ] Notification email address for form submissions.
- [ ] Final legal text for Privacy, Terms, Impressum (or accept placeholders for soft launch).

---

## 13. Non-functional requirements

| Area | Requirement |
|---|---|
| **Performance** | Fast LCP on homepage and catalog pages; optimized images via Next.js Image. |
| **SEO** | Basic meta titles/descriptions per page and locale (recommended, not blocking v1). |
| **Accessibility** | Semantic HTML, form labels, keyboard navigation, sufficient contrast. |
| **Security** | Server-side form validation; env vars for secrets; no secrets in repo. |
| **Hosting** | Vercel (recommended for Next.js). |
| **CMS auth** | Sveltia GitHub OAuth (Cloudflare Worker or equivalent) for production admin access. |

---

## 14. Future phases (not v1)

Documented for planning only — **not part of current build:**

- Packages / bundles (CMS collection + homepage section + nav).
- Search and catalog filters.
- Product quote cart with combined request.
- Public pricing or “from €X” display.
- Availability / inventory calendar.
- Online deposits or payments.
- Customer accounts and saved quotes.
- n8n / CRM lead automation.
- Auto-reply emails to submitters.
- CMS-managed FAQ, footer, and homepage sections.
- Analytics (GA4 / Plausible).
- Spam protection (Turnstile / honeypot).

---

## 15. Open items & assumptions

| Item | Assumption |
|---|---|
| Sveltia GitHub backend | Repo and OAuth worker configured for production CMS access. |
| Legal pages | Placeholder text acceptable until final copy from client/lawyer. |
| Gallery | Six static placeholder images acceptable at first launch. |
| Trust stats in hero | Static numbers in code unless client specifies otherwise. |
| Email sender domain | Resend domain verified for production `from` address. |

---

## 16. Approval reference

This document reflects requirements agreed through stakeholder Q&A sessions, including:

- Quote-only model with manual confirmation  
- Sveltia CMS for catalog  
- No pricing or availability on products  
- CH / DE / FR delivery messaging  
- 12-language gate and locale URLs  
- No packages, no events nav, gallery-only for past events  
- Form fields: name, email, phone, event date, country, message  
- Email-only lead capture with thank-you page  
- Dark + orange design matching previous site  

**Next document:** [Tech.md](./Tech.md) — architecture and implementation plan.
