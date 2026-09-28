# Memory – Nadeos (storefront theme)

Decisions and context that aren't obvious from the code. Newest first.

## 2026-09-23 – Footer notice link must not depend on the checkout toggle

- Initially gated the footer "Your legal guarantee rights" link behind
  `config('core.cart.showLegalGuaranteeNotice')` for "consistency" with the native checkout
  integration. Wrong call, caught by the user: that setting's own admin label scopes it to the
  checkout page specifically ("Gewährleistungshinweis auf Bestellabschlussseite anzeigen"). There's
  no legitimate reason a merchant would want the footer reminder hidden just because they haven't
  opted into the checkout-page variant — footer and checkout are independent placements satisfying
  the EU guideline's "general reminder on the website" requirement separately. Removed the `{% if %}`
  gate; footer link now always renders.
- Debugging trail before finding this: confirmed via `grep` on the server that the deployed file was
  correct (ruled out bad deploy), confirmed `APP_ENV=prod` was already right (ruled out env mismatch),
  ran `cache:clear` + `cache:warmup` — still didn't show. The actual cause was the toggle being off
  the whole time, not caching at all. Lesson: check config-gated conditions before chasing cache
  ghosts.

## 2026-09-22/23 – EU legal guarantee notice + GARAN label: built custom, then mostly ripped out

Full context: `C:\Development\nadeos\ISSUE-01_EU-GUARAN\` (source files from the EU Commission),
`Practical guidelines Harmonised Label&Notice product guarantees_ARES 27042026.pdf`.

- Two distinct EU requirements (Regulation (EU) 2025/1960): the **Notice** (statutory legal
  guarantee reminder, shop-wide, fixed content) and the **GARAN label** (per-product commercial
  durability guarantee badge, only for qualifying products, editable fields).
- First pass (shop was on Shopware 6.7.11.0): built both from scratch — custom product custom
  fields (`nadeos_garan_years`/`brand`/`model`), a `_macros.html.twig` with `noticeTrigger()` /
  `garanBadge()` macros, bundled 24 translated Notice SVGs + GARAN label PNGs under
  `Resources/public/eu-garan/`, overrides on `buy-widget.html.twig`, `footer.html.twig`, and a new
  `checkout/confirm/index.html.twig`.
- Turned out **Shopware 6.7.14 (released 2026-09-09, backported to 6.6) ships this natively as a
  core feature** — confirmed by reading the actual shipping PR (`shopware/shopware#18290`), not just
  the marketing post. Native: product field `guaranteeMonths` (+ `guaranteeConfirmed` toggle, uses
  existing Manufacturer + Manufacturer-product-number fields instead of new custom fields), Twig
  filters `sw_garan_label(_nested|_data_uri|_nested_uri|_duration)` and
  `sw_legal_guarantee_notice(_link)`, Store API routes `/store-api/product/{id}/garan-label` and
  `/store-api/legal-guarantee-notice`, system config `core.cart.showLegalGuaranteeNotice`. Wired
  natively into buy-widget, cart line items, checkout confirm (ToS text), and the order confirmation
  mail (only if that mail template is still the unmodified default — customized ones need
  `{{ nestedItem.productId|sw_garan_label_nested_uri(context) }}` and
  `{{ context.languageId|sw_legal_guarantee_notice_link }}` added manually).
- **What core does NOT cover: a persistent site-wide placement (footer/header).** Checked the actual
  PR file list — no `footer.html.twig` touched. That's the one genuinely custom piece left.
- After the shop upgraded to 6.7.14.1: reverted `buy-widget.html.twig` to stock (zero diff), deleted
  the checkout-confirm override, the macros file, all bundled `eu-garan` assets, and the custom
  snippet files. Kept only a rebuilt `footer.html.twig` block using the native
  `sw_legal_guarantee_notice(_link)` filters instead of the bundled SVGs — much smaller footprint,
  stays in sync with core automatically.
- GARAN label not showing on a real product turned out to be twofold: (1) `Hersteller-Produktnummer`
  field was empty (required, easy to confuse with the regular `Produktnummer`/SKU or `GTIN/EAN` —
  three different "number" fields on a product), (2) separately, the stale-cache/`APP_ENV` issue
  above.

## 2026-09-22 – Plugin work must happen in the git repo, not the deployed copy

`C:\Development\nadeos\web\custom\plugins\Nadeos` is a deploy target (composer path-repo symlink
target in the live/dev install), not the source of truth — that's `C:\Development\nadeos\Nadeos`
(this repo). Edited the wrong one once; reverted it back to untouched and moved the real work here.

## 2026-09-28 – Footer redesign: decisions

- Revocation button = Shopware core (`showRevocationButton` + `revocationRequestPage`), not the
  "Widerufsformular" footer category - that category was only a workaround to give the link its own
  group and goes away. Label kept as "Widerrufen Sie Ihre Bestellung" via snippet override.
- Legal links only in the bottom service row. Recognised through the Grundeinstellungen CMS page IDs
  (tos/revocation/privacy/imprint), not by name, so nothing is hardcoded. Verified read-only on
  2026-09-28 that privacy and tos pages are configured (login page links to /widgets/cms/ ids);
  revocation/imprint not checkable from the storefront.
- Local PHP is 8.3, vendor needs 8.4 - `bin/console` doesn't run locally. Twig syntax checked by
  parsing with vendor/twig directly (Shopware tags stubbed).

