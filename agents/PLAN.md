# Plan – Nadeos (storefront theme)

Status legend: `[ ]` open · `[~]` in progress · `[x]` done · `[?]` needs decision

## EU legal guarantee notice / GARAN label (Regulation (EU) 2025/1960)

Background and what's native vs. custom: `agents/MEMORY.md` (2026-09-22/23 entries).

- [x] Custom GARAN label + Notice implementation built (superseded by native support, mostly reverted)
- [x] Confirmed native support in Shopware 6.7.14+ covers: product page, cart, checkout, email
- [x] Reverted redundant custom code (buy-widget, checkout-confirm override, bundled assets, snippets)
- [x] Footer link rebuilt on native `sw_legal_guarantee_notice(_link)` filters, not gated by the
      checkout-scoped config toggle
- [x] Footer link confirmed live (2026-09-28, verified via direct fetch of nadeos.com: modal markup
      and notice text both present in the served HTML)
- [x] Header placement — decided against (2026-09-28): footer-only, not adding it.
- [x] Order confirmation mail — decided against touching it (2026-09-28, user: doesn't want to
      touch the email template at all right now). Left as a known gap, not fixed: if that template
      has ever been customized, native GARAN-label/notice content silently won't appear in
      confirmation emails until the two Twig filter calls are added manually (see `MEMORY.md`
      2026-09-22/23 entry) — nobody's checked whether it's actually customized, and it's staying
      that way for now.

## Status: closed out (2026-09-28)

Nothing open on this task. Next up: Vertreterportal (`NadeosExporter/agents/PLAN.md`), pending the
user's explicit go-ahead to start.
