import { useState } from 'react'
import { Link } from 'wouter'
import { useInView } from '../hooks/useInView'
import { ALL_LABS, CATEGORIES } from '../data/labsData'

export default function Labs() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const { ref: heroRef, visible: heroVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  const filtered = ALL_LABS.filter(lab => {
    const matchCat = activeCategory === 'ALL' || lab.category === activeCategory
    const matchSearch = lab.name.toLowerCase().includes(search.toLowerCase()) ||
      lab.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="labs-page">

      {/* ── Hero Banner ── */}
      <section className="lp-hero">
        <div
          ref={heroRef as React.RefObject<HTMLDivElement>}
          className={`lp-hero-content reveal${heroVisible ? ' visible' : ''}`}
        >
          <p className="lp-eyebrow">OUR FACILITIES</p>
          <h1 className="lp-title">World-Class Labs</h1>
          <p className="lp-subtitle">
            14 state-of-the-art laboratories built to push the boundaries of technology,
            creativity, and hands-on learning.
          </p>
          <div className="lp-stats">
            <div className="lp-stat"><span className="lp-stat-num">12+</span><span className="lp-stat-label">Active Labs</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">500+</span><span className="lp-stat-label">Workstations</span></div>
            <div className="lp-stat-divider" />
            <div className="lp-stat"><span className="lp-stat-num">24/7</span><span className="lp-stat-label">Access</span></div>
          </div>
        </div>
      </section>

      {/* ── Filter + Search ── */}
      <div className="lp-controls">
        <div className="lp-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="lp-search"
            type="text"
            placeholder="Search labs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="lp-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`lp-filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Labs Grid ── */}
      <div className="lp-grid-wrap">
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`lp-grid stagger${gridVisible ? ' visible' : ''}`}
        >
          {filtered.length > 0 ? filtered.map(lab => (
            <div className="lp-card" key={lab.name}>
              <div className="lp-card-img-wrap">
                <img src={lab.img} alt={lab.name} className="lp-card-img" />
                <span className="lp-badge">◎ AVAILABLE</span>
                <span className="lp-cat-tag">{lab.category}</span>
              </div>
              <div className="lp-card-body">
                <h3 className="lp-card-name">{lab.name}</h3>
                <p className="lp-card-desc">{lab.desc}</p>
                <div className="lp-card-resources">
                  {lab.resources.map(r => (
                    <span className="lp-resource" key={r}>⚡ {r}</span>
                  ))}
                </div>
                <Link href={`/labs/${lab.slug}`} className="lp-book-btn">View &amp; Book →</Link>
              </div>
            </div>
          )) : (
            <p className="lp-no-results">No labs match your search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
