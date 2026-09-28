# Nadeos (storefront theme) – Agent entry point

Shopware 6.7 theme plugin. This is the git repo / source of truth — the deployed copy at
`C:\Development\nadeos\web\custom\plugins\Nadeos` is reference/deploy-target only.

Before working, read:
- `agents/PLAN.md` — current work (EU legal guarantee notice / GARAN label rollout) and open items
- `agents/RULES.md` — project rules, especially: check whether Shopware core already covers a
  request before building it custom, and the deploy/cache gotchas on this server
- `agents/MEMORY.md` — dated decisions, including the full story of what turned out to be native
  vs. custom for the EU-compliance work
- `agents/DESIGN.md` — before touching any styling: reuse existing themed components/classes, don't
  invent new CSS; footer/nav content is Admin category-builder-driven, not hardcoded in templates

Workspace-level rules (DB access, browser/checkout testing) are in
`C:\Development\nadeos\agents\RULES.md`.

While working:
- Tick items in `PLAN.md` as they land.
- Add new decisions to `MEMORY.md` with a date; add rules to `RULES.md`.
- If a request doesn't move `PLAN.md` forward and isn't clearly urgent, flag that per
  `C:\Development\CLAUDE.md`'s scope-creep rule before just doing it.
