import { useEffect, useMemo, useRef, useState } from 'react'
import { geoIdentity, geoPath } from 'd3-geo'
import { scaleSequential } from 'd3-scale'
import { interpolateBlues } from 'd3-scale-chromatic'
import { feature } from 'topojson-client'
import { placeholderRate } from '../data/placeholderRates'
import { vaHpsa } from '../data/vaHpsa'
import { vaPopulation } from '../data/vaPopulation'

const VA_FIPS_PREFIX = '51'
const ASPECT = 0.55

const formatInt = (n) => n.toLocaleString()

export function VaMap({ selectedId, onSelectLocality }) {
  const [topology, setTopology] = useState(null)
  const [error, setError] = useState(null)
  const [hovered, setHovered] = useState(null)
  const containerRef = useRef(null)
  const [width, setWidth] = useState(900)

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}counties-10m.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setTopology(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const e of entries) {
        setWidth(Math.max(320, Math.round(e.contentRect.width)))
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const height = Math.round(width * ASPECT)

  const { vaFeatures, pathFn } = useMemo(() => {
    if (!topology) return { vaFeatures: [], pathFn: null }
    const counties = feature(topology, topology.objects.counties)
    const features = counties.features.filter((f) =>
      String(f.id).startsWith(VA_FIPS_PREFIX),
    )
    const fc = { type: 'FeatureCollection', features }
    const projection = geoIdentity()
      .reflectY(true)
      .fitSize([width, height], fc)
    return { vaFeatures: features, pathFn: geoPath(projection) }
  }, [topology, width, height])

  const colorScale = useMemo(
    () => scaleSequential(interpolateBlues).domain([0, 1]),
    [],
  )

  const handleClick = (f) => {
    if (!onSelectLocality) return
    if (selectedId === f.id) {
      onSelectLocality(null)
    } else {
      onSelectLocality(f.id, f.properties.name)
    }
  }

  return (
    <div ref={containerRef} className="va-map">
      {error && (
        <div className="map-status">
          Couldn't load map data: {String(error.message || error)}
        </div>
      )}
      {!error && !topology && (
        <div className="map-status">Loading map…</div>
      )}
      {topology && pathFn && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Map of Virginia localities colored by Medicaid dental provider participation rate"
        >
          {vaFeatures.map((f) => {
            const rate = placeholderRate(f.id)
            const isSelected = selectedId === f.id
            const isHovered = hovered && hovered.id === f.id
            const stroke = isSelected
              ? '#0c2340'
              : isHovered
                ? '#0c2340'
                : '#ffffff'
            const strokeWidth = isSelected ? 2 : isHovered ? 1.5 : 0.5
            return (
              <path
                key={f.id}
                d={pathFn(f)}
                fill={colorScale(rate)}
                stroke={stroke}
                strokeWidth={strokeWidth}
                onMouseEnter={() => {
                  const fips = f.id
                  setHovered({
                    id: fips,
                    name: f.properties.name,
                    rate,
                    population: vaPopulation[fips]?.population ?? null,
                    hpsa: vaHpsa[fips] ?? null,
                  })
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(f)}
                style={{ cursor: 'pointer' }}
              />
            )
          })}
        </svg>
      )}

      {hovered && (
        <div className="map-tooltip">
          <div className="map-tooltip-name">{hovered.name}</div>
          <div className="map-tooltip-value">
            {Math.round(hovered.rate * 100)}% participation
            <span className="map-tooltip-tag">placeholder</span>
          </div>
          {hovered.population !== null && (
            <div className="map-tooltip-fact">
              Population {formatInt(hovered.population)}
              <span className="map-tooltip-source">Census 2022</span>
            </div>
          )}
          {hovered.hpsa && (
            <div className="map-tooltip-fact">
              Dental HPSA · score {hovered.hpsa.score}
              <span className="map-tooltip-source">
                {hovered.hpsa.designationTypes[0]}
                {hovered.hpsa.designationTypes.length > 1 ? ' +' : ''}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="map-legend">
        <span>Lower</span>
        <span className="map-legend-gradient" aria-hidden="true" />
        <span>Higher participation</span>
      </div>
    </div>
  )
}
