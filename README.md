# Virginia Medicaid Dental Access Dashboard

A public-facing web dashboard visualizing Medicaid dental provider participation, reimbursement rates, and geographic access gaps across Virginia's 95 counties and 38 independent cities.

Built to support a Virginia study bill directing the Department of Medical Assistance Services (DMAS) to formally research Medicaid dental access.

## Status

**Live data integration is in progress.** Visualizations currently render on **placeholder data** clearly labeled in the UI. See [`DATA.md`](./DATA.md) for the data-sourcing roadmap.

## Stack

- **React 19 + Vite 8** — static SPA, no backend
- **D3** (`d3-geo`, `d3-scale`, `d3-scale-chromatic`) + `topojson-client` — Virginia choropleth
- **Recharts** — bar and line charts
- **Deployed on Vercel**

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Project structure

```
src/
├── App.jsx                  Top-level layout + selection state
├── components/
│   ├── VaMap.jsx            VA choropleth (D3 + TopoJSON)
│   ├── ReimbursementChart.jsx
│   └── ParticipationTrendChart.jsx
└── data/
    ├── placeholderRates.js          Per-locality participation rates
    ├── placeholderReimbursement.js  Procedure-code reimbursement comparison
    └── placeholderTrend.js          Statewide + per-locality dentist counts

public/
└── counties-10m.json        US counties TopoJSON (us-atlas@3), filtered to VA at runtime
```

## Contributing real data

See [`DATA.md`](./DATA.md) for the dataset roadmap and integration instructions. The placeholder files are intentionally small and stable — swapping real values in is mechanical.
