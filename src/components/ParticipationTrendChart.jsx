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
  const scope = payload[0].payload.scope
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="chart-tooltip-row">
          <span
            className="chart-tooltip-swatch"
            style={{ background: p.color }}
          />
          <span className="chart-tooltip-name">
            Active dentists ({scope})
          </span>
          <span className="chart-tooltip-value">{formatNumber(p.value)}</span>
        </div>
      ))}
    </div>
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
          dot={{ r: 3.5, fill: '#232d4b' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
