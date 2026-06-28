import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { localityTrend, trendData } from '../data/placeholderTrend'

const formatNumber = (v) => v.toLocaleString()

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      <div className="chart-tooltip-row">
        <span
          className="chart-tooltip-swatch"
          style={{ background: payload[0].color }}
        />
        <span className="chart-tooltip-name">
          Active dentists ({row.scope})
        </span>
        <span className="chart-tooltip-value">{formatNumber(payload[0].value)}</span>
      </div>
      <div className="chart-tooltip-note">
        {row.verified ? 'Verified' : 'Estimated / interpolated'}
      </div>
      {row.source && (
        <div className="chart-tooltip-source">{row.source}</div>
      )}
    </div>
  )
}

function VerifiedDot(props) {
  const { cx, cy, payload } = props
  if (typeof cx !== 'number' || typeof cy !== 'number') return null
  return payload.verified ? (
    <circle cx={cx} cy={cy} r={4.5} fill="#232d4b" stroke="#ffffff" strokeWidth={1.5} />
  ) : (
    <circle cx={cx} cy={cy} r={3} fill="#ffffff" stroke="#232d4b" strokeWidth={1.5} />
  )
}

export function ParticipationTrendChart({ selectedLocality }) {
  const data = useMemo(() => {
    if (selectedLocality) {
      return localityTrend(selectedLocality.id).map((d) => ({
        ...d,
        scope: selectedLocality.name,
      }))
    }
    return trendData.map((d) => ({ ...d, scope: 'Statewide' }))
  }, [selectedLocality])

  return (
    <div className="trend-chart">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 16, right: 12, left: 4, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#5b6470' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12, fill: '#5b6470' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatNumber}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="dentists"
            stroke="#232d4b"
            strokeWidth={2}
            dot={<VerifiedDot />}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="trend-legend">
        <span className="trend-legend-item">
          <span className="trend-dot trend-dot-verified" /> Verified (DMAS report)
        </span>
        <span className="trend-legend-item">
          <span className="trend-dot trend-dot-estimated" /> Estimated / interpolated
        </span>
      </div>
    </div>
  )
}
