# DMAS Data Request Templates

Two paths for getting the missing data described in [`../DATA.md`](../DATA.md):

1. **Senator's office channel** — fastest. A request from Senator Srinivasan's staff to DMAS leadership typically gets a response in days, not weeks. No formal legal mechanism, just a professional ask between agencies and a sitting senator.
2. **Virginia FOIA** — backup. If the informal route is delayed or refused, Va. Code § 2.2-3704 requires DMAS to produce non-exempt public records within five working days (with one seven-day extension permitted). Use this if you've waited two weeks on the informal route and gotten nothing actionable.

Both templates ask for the **same three things**, scoped tightly enough that DMAS can respond without a major data engineering lift.

---

## What we're asking for (in priority order)

| # | Dataset | What it unlocks on the dashboard |
|---|---|---|
| 1 | **Provider participation by locality** — current Smiles for Children / Cardinal Care Smiles enrolled-dentist roster with practice ZIP or locality, plus a participation indicator (treated ≥1 Medicaid patient in last 12 months) | Map's primary color story (currently placeholder); Loudoun spotlight's three core stats |
| 2 | **Medicaid enrollment by locality** — most recent monthly enrollment counts broken out by county / independent city FIPS | Loudoun spotlight's enrollee count; member-per-dentist ratios statewide and per-locality |
| 3 | **Historical statewide active-dentist counts** — fiscal years 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2019, 2020, 2021 (the gap years between our verified FY10/FY18/FY22 figures) | Trend chart's verified points (currently 3 verified + 10 interpolated) |

We already have FY10, FY18, FY22 from the November 2022 DMAS Access Report. Item 3 fills the gaps between those.

---

## Template A — Senator's office channel

Use on Senator Srinivasan's office letterhead, sent by a staff member to the appropriate DMAS deputy director. Probably routed through DMAS's Office of Dental Services or DMAS's Office of Government Relations / Communications first.

```
[Date]

[Recipient name], [title]
Virginia Department of Medical Assistance Services
600 East Broad Street, Suite 1300
Richmond, VA 23219

Dear [Recipient]:

The office of Senator Kannan Srinivasan (Senate District 32) is preparing
public-facing research on Medicaid dental access in Virginia. The research
draws on the November 2022 DMAS Access Report and aims to support a more
detailed examination of where the access gap is widest and what's driving it.

To make our analysis useful at the locality level, we would appreciate
DMAS providing three data extracts:

1. Smiles for Children / Cardinal Care Smiles enrolled-dentist roster as
   of the most recent reporting date, including for each provider:
   National Provider Identifier (NPI), practice name, practice ZIP code or
   locality (FIPS or county/independent city name), and an indicator of
   whether the provider has billed at least one Medicaid dental claim in
   the most recent 12 months.

2. Medicaid enrollment by locality (county and independent city) for the
   most recent reporting month, in machine-readable format.

3. Annual count of active Medicaid-billing dentists statewide for fiscal
   years 2011 through 2017 and 2019 through 2021 — the years between the
   FY10, FY18, and FY22 figures already published in the November 2022
   DMAS Access Report.

Machine-readable formats (CSV or Excel) would be ideal, but PDF reports
are also workable.

If any of the above is not routinely available, we would welcome a brief
note on what alternative measure DMAS uses internally — that itself is
useful context for our research.

Please let me know if you have questions, need clarification on scope,
or would like to discuss the project. Happy to set up a brief call.

Thank you for your time and assistance.

Sincerely,

[Staff name]
[Staff title], Office of Senator Kannan Srinivasan
[Contact email] · [Contact phone]
```

**Routing tips**

- DMAS's Office of Dental Services oversees the Smiles for Children program — they will own items 1 and (likely) 2.
- Item 3 may route to DMAS's research/analytics team or Government Relations.
- Sending one email with all three asks is fine; expect them to come back from different units.
- If the recipient asks for a written records request to formally process, that's the cue to send Template B in parallel — same content, recast as VFOIA.

---

## Template B — Virginia FOIA request

Use if the informal route stalls. Send via certified mail or email with delivery confirmation. DMAS must respond within five working days under Va. Code § 2.2-3704; they may invoke a single seven-day extension.

```
[Date]

Virginia FOIA Officer
Virginia Department of Medical Assistance Services
600 East Broad Street, Suite 1300
Richmond, VA 23219
foia@dmas.virginia.gov

Re: Public Records Request — Va. Code § 2.2-3704

Dear FOIA Officer:

This is a request under the Virginia Freedom of Information Act
(Va. Code § 2.2-3700 et seq.) for the following public records held by the
Department of Medical Assistance Services:

1. The most recent extract of the Smiles for Children / Cardinal Care
   Smiles enrolled-dentist roster, including for each provider:
   - National Provider Identifier (NPI)
   - Practice name
   - Practice ZIP code, or county / independent city if available
   - An indicator (yes/no, date of most recent paid claim, or equivalent)
   of whether the provider has billed at least one Medicaid dental claim
   in the most recent twelve months

2. Medicaid total enrollment broken out by locality (county and
   independent city) for the most recent reporting month available.

3. Annual statewide count of active Medicaid-billing dentists for state
   fiscal years 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2019, 2020,
   and 2021. (The Department's November 2022 Access Report publishes
   counts for FY10, FY18, and FY22 — this request seeks the
   intervening years.)

I request these records in electronic, machine-readable form
(CSV or Excel preferred). If electronic records exist in any other
machine-readable format, that is also acceptable.

Per Va. Code § 2.2-3704(F), I request that DMAS provide an estimate of
charges before processing if total fees are expected to exceed $200.

If DMAS believes any portion of these records is exempt from disclosure,
I request that the non-exempt portions be produced with the exempt
portions redacted, along with a written explanation citing the specific
exemption per Va. Code § 2.2-3704(B).

Per Va. Code § 2.2-3704(B), I expect a response within five working days
of receipt.

Thank you for your time and attention to this request.

Sincerely,

[Requester name]
[Mailing address — required by VFOIA]
[Email]
[Phone, optional]
```

**Notes on VFOIA**

- VFOIA requires only that the requester be a Virginia citizen or a representative of a Virginia-headquartered news organization. As a UVA student and resident, you qualify on the citizenship prong.
- The requester's name and Virginia address are required (Va. Code § 2.2-3704.01); if you'd rather not put your home address on the letter, your UVA mailing address works.
- DMAS may charge "reasonable" cost recovery for staff time and copies. The $200 estimate-threshold request in the template stops them from running up a large bill without checking first.
- If DMAS claims any record is exempt, common candidates are: trade secrets (very unlikely here), personnel records (irrelevant), and certain investigative records (irrelevant). None of these should apply to a provider roster, enrollment counts, or aggregated annual counts.

---

## What to do with the response

When DMAS sends a file, drop it into `data/raw/` following the conventions in [`../data/raw/README.md`](../data/raw/README.md):

- `dmas-provider-roster-YYYY-MM.csv`
- `dmas-medicaid-enrollment-by-locality-YYYY-MM.csv`
- `dmas-dentist-counts-fy11-21.csv`

Update [`../DATA.md`](../DATA.md) statuses to 🟢 Collected, append entries to `data/raw/MANIFEST.md`, push, then ping for integration.

---

## Other agencies (when you get to them)

| Agency | Data | Format expected |
|---|---|---|
| **Virginia Health Information (VHI)** | Hospital discharge data, average charge for ER visits with dental diagnosis codes (ICD-10 K00–K14) for Virginia, most recent year | Probably a paid data request or a one-off pull from their analyst |
| **Department of Health Professions** | Active dental license roster for Virginia, with practice ZIP | May require a separate VFOIA; the Board of Dentistry is the records custodian |
| **ADA Health Policy Institute (HPI)** | State-level commercial dental fee averages for Virginia | Member-restricted in detail; some summaries are public. The senator's office may have a contact at ADA Government Relations |

These are lower priority than the DMAS asks — chase them after the DMAS data is in.
