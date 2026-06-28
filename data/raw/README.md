# Raw collected data

This folder is your inbox for everything you compile from DMAS, VHI, CMS, ADA, Census, HRSA, scraping the DentaQuest directory, etc.

**Paste files in here.** The folder is git-tracked, so committing the file is enough — I (Claude) read from this folder when integrating data into the dashboard. You do not need to send me files chat-by-chat.

## Conventions

1. **One file per dataset, descriptively named.** Use kebab-case and include the source + retrieval year:
   - `dmas-provider-roster-2024.csv`
   - `dmas-fee-schedule-2024.csv`
   - `vhi-er-dental-visits-2022.csv`
   - `census-acs-va-locality-population-2022.csv`
   - `ada-hpi-state-fee-schedules-2024.csv`

2. **CSV is preferred.** Most agencies export to CSV or Excel. If you only have Excel (`.xlsx`), save a CSV copy alongside (`Save As → CSV`). Either is fine — I can parse both.

3. **One subdirectory per source** if a dataset has multiple files (e.g., DMAS sends a roster + an explanatory schema):
   ```
   data/raw/
   ├── dmas-provider-roster-2024.csv
   ├── dmas-provider-roster-2024-schema.pdf
   ```

4. **Don't rename columns.** Leave the source's column headers as-is — I'll handle remapping into our internal data shape during integration. Renaming destroys trust in the lineage.

5. **One short note per file.** When you add a file, append a single line to `data/raw/MANIFEST.md` (create it the first time you add a file) describing what it is and where you got it. Example:
   ```
   - dmas-provider-roster-2024.csv — DMAS Smiles for Children annual provider list. Pulled from dmas.virginia.gov/reports on 2026-07-15. Public.
   ```

## What goes here vs. `src/data/`

- **`data/raw/`** — sources of truth. CSVs/PDFs/etc. exactly as collected. Not loaded by the app.
- **`src/data/`** — derived JS modules the React app imports. Created/updated when we integrate a raw file. Smaller, normalized, transformation-friendly.

## What's needed

See [`../../DATA.md`](../../DATA.md) at repo root for the current status of each dataset: not started / in progress / collected / integrated.
