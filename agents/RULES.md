# Project Rules – Nadeos (storefront theme)

Shopware 6.7 theme plugin (`C:\Development\nadeos\Nadeos`, git repo — deployed copy at
`C:\Development\nadeos\web\custom\plugins\Nadeos` is reference/deploy-target only, never edit it
directly, edit here and sync). Extend as we go.

## Before building anything custom: check if core already does it

Shopware ships fast (6.7.11 → 6.7.14 added a whole EU-compliance feature natively in three patch
releases). Before writing a template override for a "we need to add X to the storefront" request,
check the actual Shopware changelog / source for that version range first — don't assume core
doesn't have it. We built a full custom GARAN-label + notice implementation, then had to rip most
of it back out once 6.7.14 turned out to cover it natively. See `MEMORY.md` 2026-09-22/23 for the
full story and exactly what's native vs. what's genuinely still ours.

## Template override conventions

- `sw_extends` + block override + `{{ parent() }}` first, then append — never fully replace a
  block that has content we don't own, so native/future core additions inside it still render.
- Don't gate our own additions behind a system-config toggle that's *named* for a narrower scope
  than what we're using it for (e.g. `core.cart.showLegalGuaranteeNotice` is documented as
  checkout-page-scoped; our footer link must not depend on it — see `MEMORY.md` 2026-09-23).
- Prefer native Twig filters/routes over bundling our own assets when core already ships an
  equivalent (`sw_legal_guarantee_notice`, `sw_legal_guarantee_notice_link`, `sw_garan_label*`).

## Deploy gotchas (this server specifically)

- A file being correct on disk does not mean it's live — Shopware compiles Twig into
  `var/cache/{APP_ENV}/...`. Always clear with `APP_ENV=prod` explicit, and if still stale,
  `rm -rf var/cache/prod && APP_ENV=prod bin/console cache:warmup`.
- Admin showing a stale plugin version after a sync usually just means `plugin:update <Name>`
  hasn't run yet (copying files alone doesn't bump Shopware's DB-tracked version).

## Workspace-level rules

DB access, browser/checkout testing rules etc. are one level up in
`C:\Development\nadeos\agents\RULES.md` — apply here too.
