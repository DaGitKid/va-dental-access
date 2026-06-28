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
**Status:** ✅ Integrated — 2026-06-27

**What we need:** For 5 CDT codes (D0150, D1110, D2140, D7140, D2740), the Medicaid fee-schedule amount for **Virginia, Maryland, North Carolina, and Minnesota**. (Now integrated with 8 codes per `reimbursement.csv`.)

**Sources:**
- **VA Medicaid dental fee schedule** — DMAS, annual PDF.
- **MD / NC / MN Medicaid fee schedules** — each state's Medicaid agency publishes annually. Pull the same fiscal year for fair comparison.
- _(Optional)_ ADA Health Policy Institute for commercial averages if we ever add a private-rate comparator back.

**Integration path:** Edit the `rawData` array in place. Same field names: `{ code, label, va, md, nc, mn }`. The MN-normalized percentages are computed downstream automatically.

**Raw files in `data/raw/`:** `reimbursement.csv` (added 2026-06-27)

---

## 3. Provider participation over time

**Placeholder file:** `src/data/placeholderTrend.js`
**Status:** ✅ Integrated — 2026-06-27 (FY06–FY22; seven years verified from DMAS Annual Report 2009 + DentaQuest 2011 RFP + DMAS Access Report Nov 2022, remaining ten years interpolated with notes)

**What we need:** Statewide count of active Medicaid-billing dentists by fiscal year (ideally FY18–latest). Per-locality history is bonus.

**Sources:**
- **DMAS Smiles for Children annual reports** — yearly statewide totals in narrative form. `dmas.virginia.gov/data/reports-and-publications/`.
- **DMAS Joint Subcommittee documents** sometimes break out dental provider counts.
- **Per-locality history:** likely a DMAS data request.

**Integration path:** Replace `trendData` with real `{ year, dentists }` rows. Per-locality: replace `localityTrend(fips)` with a lookup.

**Raw files in `data/raw/`:** `trend.csv` (latest version added 2026-06-27 via dmas.zip; supersedes earlier `files.zip` version)

---

## 4. Headline stats

**Placeholder file:** `src/data/placeholderStats.js`
**Status:** ✅ Integrated — 2026-06-27. Cards 1 and 2 sourced from the DMAS Access Report Nov 2022 (p. 3); card 3 remains 🟡 placeholder (HCCI national estimate, awaiting VHI Virginia-specific data).

**What we need:**
- Card 1 (27% participation): the DMAS 2022 report itself, so we can cite the URL + page.
- Card 2 (members per participating dentist): VA Medicaid total enrollment ÷ count of participating dentists. Both DMAS.
- Card 3 (avg dental ER visit cost): VHI hospital discharge data or CMS regional estimate.

**Bonus stat from this CSV not yet surfaced on the dashboard:** `southwest_ratio: 1,812:1` — Medicaid members per dentist in Southwest Virginia 2021 (DMAS, verified). Marked as "worst geographic gap in state." Candidate for a new "Geographic gap" callout if you want one.

**ER cost research note:** see `data/raw/er_cost_note.txt`. Best Virginia-specific proxy is a $1,091–$1,309 estimate derived from VHI 2020 hospital discharge data; getting a true Virginia dental-ER number requires a DMAS data pull (ICD-10 K00–K14). Current dashboard value ($749, HCCI national) remains placeholder per the note's recommendation.

**Raw files in `data/raw/`:** `stats.csv` (added 2026-06-27), `er_cost_note.txt` (added 2026-06-27 via dmas.zip)

---

## 5. Loudoun County spotlight

**Placeholder file:** `src/data/placeholderLoudoun.js`
**Status:** 🟡 Partial — verified context (population, HPSA designation, HPSA pop served) integrated 2026-06-27; three core stats still 🔴 placeholder pending DMAS data request

**What we need (still):**
- Loudoun Medicaid enrollment (requires DMAS locality enrollment report)
- Loudoun participation rate (requires DMAS provider directory)
- Loudoun members-per-dentist ratio (derives from the above)

**What we have:**
- Population 420,959 (Census ACS 5-yr 2022)
- Federal Dental HPSA designation, score 17 (HRSA BCD_HPSA, June 2026)
- HPSA population served: 42,083 — Loudoun Community Health Center FQHC

**Raw files in `data/raw/`:** `loudoun_spotlight.csv` (added 2026-06-27)

---

## 6. HRSA Dental HPSAs

**Module:** `src/data/vaHpsa.js`
**Status:** ✅ Integrated — 2026-06-27. 112 of 133 VA localities designated (84%); HPSA score + designation type per locality.

**Surfaced where:**
- Map tooltip — every locality with HPSA data shows score + first designation type
- About section — `"84% of Virginia's 133 localities carry a federal Dental HPSA designation"` (computed live from this dataset)

**Raw files in `data/raw/`:** `hpsa_dental_va.csv` (added 2026-06-27)

---

## 7. Census ACS locality population

**Module:** `src/data/vaPopulation.js`
**Status:** ✅ Integrated — 2026-06-27. 25 most-populous localities sourced.

**Surfaced where:**
- Map tooltip — locality population shown when available
- Loudoun spotlight — explicit population figure (420,959)

**Raw files in `data/raw/`:** `va_population.csv` (added 2026-06-27)

---

## 8. Other supporting datasets (not yet integrated)

- **VA Medicaid enrollment by locality** — DMAS monthly reports. Enables a "Medicaid enrollees per participating dentist" map overlay.
- **Commercial reimbursement rates** — ADA Health Policy Institute state-level averages. Member-restricted; flagged in `data/raw/reimbursement_notes.txt`. Adding a `commercial` column to `reimbursement.csv` would let us show the Medicaid-vs-commercial gap directly on the reimbursement chart.

---

## How to flip a panel from placeholder to live data

1. Drop the raw file into `data/raw/` (kebab-case name, see the [`data/raw/README.md`](./data/raw/README.md)).
2. Update the **Status** above to 🟢 **Collected** and list the file under that section's "Raw files."
3. Ask me to integrate. I'll write the transformation, update the `src/data/<placeholder>.js` export, and remove the yellow "Placeholder" badge from the corresponding panel.
4. We add a **Source: …** footnote citing the file + retrieval date.
5. Status flips to ✅ **Integrated**.
