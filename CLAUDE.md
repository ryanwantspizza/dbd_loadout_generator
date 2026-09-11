# CLAUDE.md

## Project
DBD Loadout Generator — a React web app that generates semi-random Dead by
Daylight builds for the **Survivor** and **Killer** roles. Beyond a plain
randomizer, it lets players allow/disallow individual perks, items, add-ons,
killers, and offerings before generating. Bootstrapped with Create React App and
deployed to GitHub Pages (https://rhubble1987.github.io/dbd_loadout_generator/).

## Commands
- `npm start` — run the dev server (react-scripts).
- `npm test` — run tests (react-scripts / Jest + React Testing Library).
- `npm run build` — production build into `build/`.
- `npm run deploy` — publish `build/` to GitHub Pages (`predeploy` builds first).

## Tech stack
React 18, Recoil (state), react-bootstrap + Bootstrap 5 (UI), react-papaparse
(CSV parsing), IndexedDB + localStorage (persistence). No TypeScript, no router.

## Data source
Game data lives in a Google Sheet published as CSV, one worksheet `gid` per
entity. All URLs are in `src/urls.js`. Lists are fetched at runtime with
`readRemoteFile` (react-papaparse), not bundled.

## Architecture
- `src/index.js` / `src/App.js` — mount the app inside `RecoilRoot`. `App.js`
  renders a Killers/Survivors toggle that switches between `<SurvivorRole/>` and
  `<KillerRole/>`, persists the choice to `localStorage["survivorRole"]`, and
  sets a `select-survivors` / `select-killers` class on `document.body`.
- `src/Components/survivorRole.js`, `killerRole.js` — layout for each role: a row
  of `Selector`s (generate) over a row of `List`s (filter). Both wire the same
  `states` atoms and `urls` to the shared components; killer selectors pass
  `role="killer"`.
- `src/Components/list.js` (`List`) — loads a CSV into its Recoil list atom, sorts
  by name, drops opposite-role offerings, then reconciles with the
  `${id}NotAllowed` IndexedDB store to set `allowed=false` on excluded items.
  Renders `Checkbox` rows in a Bootstrap `Accordion`; `killerAddOns` are grouped
  by killer. "Allow Empty Slot" toggle persists to `localStorage`.
- `src/Components/checkbox.js` (`Checkbox`) — toggles `item.allowed` in the list
  atom and writes/removes the item in the `${id}NotAllowed` store.
- `src/Components/selector.js` (`Selector`) — the "Get X" button. Randomly picks
  from items where `allowed === true`: up to 4 perks, a single survivor/offering,
  or a killer/item plus up to 2 applicable add-ons. Persists the result to the
  `${id}CurrentSelection` store (+ add-on store) and reloads it on mount.
  Delegates rendering to `PerksSelector` / `AddOnsSelector` / a plain message.
- `src/Components/perksSelector.js`, `addOnsSelector.js` — render the generated
  result in a table with a per-row **Refresh** button that swaps one entry for a
  new random allowed option.

## State (`src/states.js`)
A single exported `states` object of Recoil atoms:
- `*State` (e.g. `survivorPerksState`, `killersState`) — the loaded list for an
  entity; each element carries an `allowed` boolean.
- empty-slot booleans (`allowEmptySurvivorPerk`, `noItemAllowedState`, …) —
  whether "no selection" is a possible random outcome for a slot.
- `currentlySelected*` — the generated results (perks arrays, killer/item + add-ons).

## Persistence (`src/Utilities/indexDb.js`)
IndexedDB database `dbd_buildout_db`. Two object stores per entity, keyPath `"id"`:
- `${entity}NotAllowed` — filter exclusions (what the user unchecked).
- `${entity}CurrentSelection` — the last generated result.

Helpers: `initIndexDb`, `insertData` (no-ops if the id already exists),
`getAllData`, `getData`, `deleteData`, `clearObjectStore`.

**IMPORTANT — deploy step:** bump `dbVersion` in `indexDb.js` on every deploy.
`onupgradeneeded` deletes and recreates all object stores, so returning users only
pick up store/schema changes when the version increments.

localStorage keys: `survivorRole`, `${id}AccordionState`, `${id}emptyAllowed`.

## Conventions & gotchas
- Named exports only (`export { Foo }`); PascalCase function components under
  `src/Components`.
- The `id` prop is the source of truth for store names: `List` derives
  `${id}NotAllowed`; `Selector` ids end in `CurrentSelection`.
- Heavy defensive optional chaining (`?.`); many leftover `console.log`s.
- `RecoilRoot` is wrapped in both `index.js` and `App.js` (redundant but harmless).
- Sorting by name is duplicated inline in `list.js`; a shared `orderResultsByName`
  exists in `src/helpers.js`.
- **Unused/experimental files** (not imported anywhere): `propagate.js`,
  `enable_parent.js`, `disable_child.js` — intended parent/child checkbox
  propagation, safe to ignore.
- Killer role and perk-trait filtering are only partially implemented (see README).
