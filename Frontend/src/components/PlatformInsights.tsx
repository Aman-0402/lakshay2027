import { useInView } from '../hooks/useInView'

const stats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: '86+', label: 'REGISTERED USERS',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    value: '13', label: 'ACTIVE LABS',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    value: '2+', label: 'BOOKINGS MADE',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: '3+', label: 'ACTIVE TEAMS',
  },
]

export default function PlatformInsights() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  return (
    <section className="insights-section">
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
        {stats.map(stat => (
          <div className="insights-card" key={stat.label}>
            <div className="insights-icon">{stat.icon}</div>
            <span className="insights-value">{stat.value}</span>
            <span className="insights-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
