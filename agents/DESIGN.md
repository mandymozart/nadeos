# Design dogma – Nadeos storefront

Derived from the product detail page (`Naturseife Nr. 5 Rose`, screenshot 2026-09-28) plus the actual
Shopware/Bootstrap source this theme extends. The screenshot shows *intent*; the SCSS source is the
*ground truth* for what produces it — read both, but when they'd conflict, match the source's
existing component, don't eyeball a color from a screenshot.

## The one rule everything else follows

**Reuse Shopware's existing themed components and classes. Do not invent new CSS for something a
`.btn-*` class, a Bootstrap component, or an existing footer/navigation class already does.** This
theme (`Nadeos`) is a thin skin over `@Storefront` (see `theme.json`: views/style/script all list
`@Storefront` alongside `@Nadeos`) — it should stay thin. A new element that "looks close enough"
with ad-hoc classes will drift from the real design system the moment Shopware updates it (see
`agents/RULES.md` — this already bit us once with the whole GARAN-label episode: don't rebuild what
theming/core already provides).

Concretely, before styling anything new:
1. Is there already a `.btn-*` class for this role? (`.btn-buy` = primary CTA, `.btn-link-inline` =
   button that must look like an inline text link, `.btn-outline-primary`, etc. — check
   `web/vendor/shopware/storefront/Resources/app/storefront/src/scss/skin/shopware/component/_button.scss`.)
2. Is there already a footer/nav/layout class for this position? (`.footer-service-menu-link`,
   `.footer-service-menu-item`, etc. — `.../layout/_footer.scss`.)
3. Only write new SCSS in `Nadeos/src/Resources/app/storefront/src/scss/` for something genuinely
   new, and even then prefer Bootstrap utility classes over new rules first.

## Navigation & footer content is Admin-driven, not hardcoded

The footer's "Service" / "Informationen" columns and the legal-links row come from Shopware's
**category builder / navigation assignment in Admin** (Content → Menus, category "Footer" type),
not from anything in this repo. Never hardcode a nav item, link, or column in a template — if a link
needs to exist site-wide, it goes into that category tree in Admin, not into `footer.html.twig`.
The one exception so far is the EU legal-guarantee-notice link, because it isn't a page/category,
it's a JS-triggered modal — that's why it's a template addition rather than a nav entry.

If unsure what the category builder currently produces, a read-only `SELECT` against
`category`/`category_translation`/`navigation` tables (via phpMyAdmin, per workspace rules) shows
the real structure — ask before assuming.

## Component inventory (from the screenshot + source)

| Role | Class / source | Notes |
|---|---|---|
| Primary CTA ("In den Warenkorb") | `.btn-buy` (`_button.scss`) | Solid fill using `$sw-color-buy-button` / `$sw-color-buy-button-text` — **Admin-configured** (Content → Themes → Colors), not a hex in this repo. Rounded, bold white label. |
| Inline text-styled action ("Preise inkl. MwSt...", "2 Bewertungen", breadcrumb "Alle Produkte") | plain `<a>` or `.btn.btn-link-inline` (`_button.scss`) | `text-decoration: underline`, color from `$btn-link-color` → `$primary` → `$sw-color-brand-primary` (Admin-configured). This is what the EU-notice footer/checkout links already use — correct convention, not a one-off. |
| Footer legal-links row (Datenschutz/Widerruf/AGB/Impressum) | `.footer-service-menu-link` (`_footer.scss`) | `padding: 5px 0; display: inline-block;` — color again inherited from theme link color, not set in this class. Admin/category-driven content, see above. |
| Headings (H1–H3) | Nadeos override in `base.scss`: `h1, h2, h3 { color: #a8cc12; }` | **Hardcoded hex, not the theme variable** — inconsistent with everything else on this list, which reads `$sw-color-brand-primary` from Admin. Flagging as a known inconsistency, not fixing unprompted — if the brand color ever changes in Admin, this rule won't follow it. |
| Price (discounted) | Shopware default price-box styling | Red/dark-red, bold; struck-through original price + "X% gespart" in muted gray next to it. Not themed by Nadeos. |
| Quantity stepper | Shopware default `.quantity-selector-group` | Bordered box, rounded, "−  1  +  Stück". Not themed by Nadeos. |
| Active tab (Beschreibung/Bewertungen) | Shopware default nav-tabs | Active = brand color text + underline; inactive = default text + underline. |

## Open question worth settling explicitly

Nadeos's `base.scss` mixes two approaches — some rules reference nothing and just hardcode
`#a8cc12` (topbar, h1-h3, `.main-navigation` border), while everything else on the page correctly
flows from Shopware's Admin-configured `$sw-color-brand-primary`. If the brand color is ever
changed in Admin, the hardcoded spots won't update and will visibly drift from the rest of the
site. Worth deciding whether to fix this (reference the variable everywhere) — not doing it as part
of the EU-notice work, noting it here so it doesn't get lost.
