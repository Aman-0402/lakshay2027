import { useMemo } from 'react'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useLabs } from '../hooks/useLabs'

const stats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    target: 86, suffix: '+', label: 'REGISTERED USERS',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    target: 13, suffix: '', label: 'ACTIVE LABS',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    target: 2, suffix: '+', label: 'BOOKINGS MADE',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    target: 3, suffix: '+', label: 'ACTIVE TEAMS',
  },
]

function StatCard({ stat, active, delay }: { stat: typeof stats[0]; active: boolean; delay: number }) {
  const count = useCountUp(stat.target, active, 1300 + delay)
  return (
    <div className="insights-card">
      <div className="insights-icon">{stat.icon}</div>
      <span className="insights-value">{count}{stat.suffix}</span>
      <span className="insights-label">{stat.label}</span>
    </div>
  )
}

const BAR_COLORS = ['#e53e3e', '#f59e0b', '#3b82f6', '#10b981', '#a855f7', '#ec4899', '#14b8a6', '#f97316']

function LabUtilizationChart({ active }: { active: boolean }) {
  const { labs } = useLabs()

  const breakdown = useMemo(() => {
    const counts: Record<string, number> = {}
    labs.forEach(l => { counts[l.category] = (counts[l.category] || 0) + 1 })
    const max = Math.max(...Object.values(counts), 1)
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count], i) => ({
        category, count, pct: (count / max) * 100, color: BAR_COLORS[i % BAR_COLORS.length],
      }))
  }, [labs])

  if (breakdown.length === 0) return null

  return (
    <div className="insights-chart-panel">
      <h3 className="insights-chart-title">Labs by Category</h3>
      <div className="insights-bars">
        {breakdown.map(b => (
          <div className="insights-bar-row" key={b.category}>
            <span className="insights-bar-label">{b.category}</span>
            <div className="insights-bar-track">
              <div
                className="insights-bar-fill"
                style={{
                  width: active ? `${b.pct}%` : '0%',
                  background: b.color,
                }}
              />
            </div>
            <span className="insights-bar-count">{b.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlatformInsights() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  return (
    <section className="insights-section" id="insights">
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`insights-header reveal${headVisible ? ' visible' : ''}`}
      >
        <p className="insights-eyebrow">BY THE NUMBERS</p>
        <h2 className="insights-title">PLATFORM INSIGHTS</h2>
        <p className="insights-subtitle">Real-time metrics from across the Lakshya 2047 ecosystem.</p>
      </div>
      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className={`insights-grid stagger${gridVisible ? ' visible' : ''}`}
      >
        {stats.map((stat, i) => (
          <StatCard stat={stat} active={gridVisible} delay={i * 120} key={stat.label} />
        ))}
      </div>

      <LabUtilizationChart active={gridVisible} />
    </section>
  )
}
