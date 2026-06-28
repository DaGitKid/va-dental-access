import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  benchmark,
  compareStates,
  reimbursementData,
} from '../data/placeholderReimbursement'

const formatPct = (v) => `${v}%`
const formatUsd = (v) => `$${v}`

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const row = reimbursementData.find((d) => d.code === label)
  if (!row) return null

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">
        {label} — {row.label}
      </div>
      {compareStates.map((s) => (
        <div key={s.key} className="chart-tooltip-row">
          <span
            className="chart-tooltip-swatch"
            style={{ background: s.color }}
          />
          <span className="chart-tooltip-name">{s.label}</span>
          <span className="chart-tooltip-value">
            {formatPct(row[s.pctKey])}{' '}
            <span className="chart-tooltip-aside">
              ({formatUsd(row[s.key])})
            </span>
          </span>
        </div>
      ))}
      <div className="chart-tooltip-divider" />
      <div className="chart-tooltip-row">
        <span
          className="chart-tooltip-swatch"
          style={{ background: benchmark.color }}
        />
        <span className="chart-tooltip-name">{benchmark.label} (benchmark)</span>
        <span className="chart-tooltip-value">
          100% <span className="chart-tooltip-aside">({formatUsd(row[benchmark.key])})</span>
        </span>
      </div>
    </div>
  )
}

export function ReimbursementChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={reimbursementData}
        margin={{ top: 24, right: 12, left: 4, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
        <XAxis
          dataKey="code"
          tick={{ fontSize: 12, fill: '#5b6470' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          domain={[0, 110]}
          ticks={[0, 25, 50, 75, 100]}
          tick={{ fontSize: 12, fill: '#5b6470' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatPct}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ fill: 'rgba(35, 45, 75, 0.04)' }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          iconType="circle"
        />
        <ReferenceLine
          y={100}
          stroke="#94a3c4"
          strokeDasharray="5 4"
          strokeWidth={1.5}
          label={{
            value: `${benchmark.label} benchmark (100%)`,
            position: 'insideTopRight',
            fill: '#5b6470',
            fontSize: 11,
          }}
        />
        {compareStates.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.pctKey}
            name={s.label}
            fill={s.color}
            radius={[3, 3, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
