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

## Status: EU-notice/GARAN task closed out (2026-09-28)

Nothing open on *this* task specifically. But see below — a separate, larger task was discovered
mid-verification and needs a decision before calling the footer itself "done."

## Footer redesign (mockup 2026-09-23, implemented in code 2026-09-28)

Mockup: `footer-entwurf-desktop.png` / `footer-entwurf-mobil.png` in the workspace root (Entwurf 3).
Content = exactly the existing live links, nothing added (earlier rounds invented Newsletter/Social/
"Versand"/"Deine Vorteile" blocks - dropped, don't reintroduce without an explicit decision).

- [x] Headline icons via core `sw_icon` (`headset`, `help`, `info`, `money-card`, color `primary`),
      wrapped around the core headline blocks with `parent()` kept. Admin columns get icons by
      position (1st = help, 2nd = info). No custom icon pack needed for now.
- [x] Payment icons moved into their own 4th column ("Bezahlarten", snippet
      `nadeos.footer.paymentHeadline`); four columns side by side from `lg`.
- [x] Revocation: link to category "Widerrufen Sie Ihre Bestellung" by ID
      (`019edaa7d18f786eb6ce5a1fc0a2b721`, `seoUrl()`, snippet `nadeos.footer.revocationLink`,
      `btn-outline-primary`), after the hotline collapse so it stays visible on mobile. Replaced the
      core-button approach on 2026-09-28 (user: hard link instead of the Admin setting).
- [x] Legal links (tos/revocation/privacy/imprint pages from Grundeinstellungen) only in the bottom
      row, removed from the "Informationen" column (decided 2026-09-28). Falls back to core behaviour
      if none of those pages match a service-menu entry.
- [x] Mobile: core accordion unchanged.
- [x] Admin: "Widerufsformular" category set inactive (user, 2026-09-28). Its child stays active.
      Shopware's own "Widerrufs-Button anzeigen" must stay OFF, otherwise the link shows twice.
- [ ] Deploy: sync to `web/custom/plugins/Nadeos`, `assets:install`, `theme:compile`, clear prod cache
      (see RULES.md deploy gotchas). No local test system - first real render check is on the server.
- [ ] Verify live: desktop 4 columns, mobile accordion + button visible, legal links only at bottom,
      bottom row not empty.
