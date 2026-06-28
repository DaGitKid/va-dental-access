# Data Sources & Integration Tracker

The dashboard currently runs on **placeholder data** in `src/data/*.js`, clearly labeled in the UI. This document tracks the real sources we want to integrate.

To contribute data, drop the raw file into [`data/raw/`](./data/raw/) (see the README there for naming conventions) and update the relevant **Status** line below.

## Status legend

- 🔴 **Not started** — no work yet
- 🟡 **In progress** — collection underway, not yet usable
- 🟢 **Collected** — raw file is in `data/raw/`, awaiting integration
- ✅ **Integrated** — live on the dashboard, placeholder pill removed

---

## 1. Provider participation by locality

**Placeholder file:** `src/data/placeholderRates.js`
**Status:** 🔴 Not started

**What we need:** For each of Virginia's 133 localities, the share of practicing dentists who actively bill Medicaid (Smiles for Children / DentaQuest network), as a 0–1 rate.

**Sources to compile:**
- **DMAS provider directory** (Smiles for Children) — `dmas.virginia.gov/for-members/dental/`. Programmatic access is limited; may require scraping or filing a data request with DMAS.
- **Virginia Board of Dentistry license roster** — total practicing dentists by locality (the denominator). Department of Health Professions.
- **Cross-walk:** providers to locality FIPS via ZIP → locality table (Census/USPS).

**Integration path:** Compute `participating / total` per FIPS → JSON:
```json
{ "51001": 0.32, "51003": 0.41, ... }
```
Replace the function in `placeholderRates.js` with a lookup.

**Raw files in `data/raw/`:** _(none yet)_

---

## 2. Multi-state reimbursement rates

**Placeholder file:** `src/data/placeholderReimbursement.js`
**Status:** 🔴 Not started

**What we need:** For 5 CDT codes (D0150, D1110, D2140, D7140, D2740), the Medicaid fee-schedule amount for **Virginia, Maryland, North Carolina, and Minnesota**.

**Sources:**
- **VA Medicaid dental fee schedule** — DMAS, annual PDF.
- **MD / NC / MN Medicaid fee schedules** — each state's Medicaid agency publishes annually. Pull the same fiscal year for fair comparison.
- _(Optional)_ ADA Health Policy Institute for commercial averages if we ever add a private-rate comparator back.

**Integration path:** Edit the `rawData` array in place. Same field names: `{ code, label, va, md, nc, mn }`. The MN-normalized percentages are computed downstream automatically.

**Raw files in `data/raw/`:** _(none yet)_

---

## 3. Provider participation over time

**Placeholder file:** `src/data/placeholderTrend.js`
**Status:** 🔴 Not started

**What we need:** Statewide count of active Medicaid-billing dentists by fiscal year (ideally FY18–latest). Per-locality history is bonus.

**Sources:**
- **DMAS Smiles for Children annual reports** — yearly statewide totals in narrative form. `dmas.virginia.gov/data/reports-and-publications/`.
- **DMAS Joint Subcommittee documents** sometimes break out dental provider counts.
- **Per-locality history:** likely a DMAS data request.

**Integration path:** Replace `trendData` with real `{ year, dentists }` rows. Per-locality: replace `localityTrend(fips)` with a lookup.

**Raw files in `data/raw/`:** _(none yet)_

---

## 4. Headline stats

**Placeholder file:** `src/data/placeholderStats.js`
**Status:** 🟡 Partial — Card 1 (27%) is sourced from your stated DMAS 2022 figure; cards 2 and 3 are placeholder.

**What we need:**
- Card 1 (27% participation): the DMAS 2022 report itself, so we can cite the URL + page.
- Card 2 (members per participating dentist): VA Medicaid total enrollment ÷ count of participating dentists. Both DMAS.
- Card 3 (avg dental ER visit cost): VHI hospital discharge data or CMS regional estimate.

**Raw files in `data/raw/`:** _(none yet)_

---

## 5. Loudoun County spotlight

**Placeholder file:** `src/data/placeholderLoudoun.js`
**Status:** 🔴 Not started

**What we need:** Loudoun-specific Medicaid enrollment count, locality participation rate, and members-per-participating-dentist ratio.

**Sources:** DMAS enrollment by locality (monthly reports); cross-referenced with Loudoun's slice of the provider directory.

**Raw files in `data/raw/`:** _(none yet)_

---

## 6. Supporting datasets (not yet visualized)

These would strengthen the dashboard's narrative if added later.

- **HRSA Dental HPSAs** — `data.hrsa.gov/data/download` (BCD HPSA Dental). Locality-level access overlay.
- **Census ACS 5-year locality population** — free via `api.census.gov/data/2022/acs/acs5?get=NAME,B01003_001E&for=county:*&in=state:51`. Denominator for per-capita stats.
- **VA Medicaid enrollment by locality** — DMAS monthly reports. Enables a "Medicaid enrollees per participating dentist" map overlay.

---

## How to flip a panel from placeholder to live data

1. Drop the raw file into `data/raw/` (kebab-case name, see the [`data/raw/README.md`](./data/raw/README.md)).
2. Update the **Status** above to 🟢 **Collected** and list the file under that section's "Raw files."
3. Ask me to integrate. I'll write the transformation, update the `src/data/<placeholder>.js` export, and remove the yellow "Placeholder" badge from the corresponding panel.
4. We add a **Source: …** footnote citing the file + retrieval date.
5. Status flips to ✅ **Integrated**.
