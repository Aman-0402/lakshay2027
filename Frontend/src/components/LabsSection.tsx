import { Link } from 'wouter'
import { useInView } from '../hooks/useInView'
import { useLabs, getLabImage } from '../hooks/useLabs'

export default function LabsSection() {
  const { labs, loading } = useLabs({ featured: true })
  const { ref: headerRef, visible: headerVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  return (
    <section className="labs-section">
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`labs-header reveal${headerVisible ? ' visible' : ''}`}
      >
        <div className="labs-header-left">
          <p className="labs-eyebrow">OUR FACILITIES</p>
          <h2 className="labs-title">EXPLORE OUR LABS</h2>
          <p className="labs-subtitle">
            World-class facilities designed to push the boundaries of technology,{' '}
            <span className="labs-subtitle-highlight">creativity</span>, and{' '}
            <span className="labs-subtitle-highlight">research</span>.
          </p>
        </div>
        <Link href="/labs" className="labs-view-more">VIEW MORE LABS →</Link>
      </div>

      {!loading && (
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`labs-grid stagger${gridVisible ? ' visible' : ''}`}
        >
          {labs.map(lab => (
            <div className="lab-card" key={lab.id}>
              <div className="lab-card-img-wrap">
                <img src={getLabImage(lab)} alt={lab.name} className="lab-card-img" />
                <span className="lab-badge">◎ {lab.available ? 'AVAILABLE' : 'UNAVAILABLE'}</span>
              </div>
              <div className="lab-card-body">
                <div className="lab-card-meta">
                  <span className="lab-category">{lab.category}</span>
                </div>
                <h3 className="lab-name">{lab.name}</h3>
                <p className="lab-desc">{lab.description}</p>
                <div className="lab-resources">
                  {lab.resources.map(r => <span className="lab-resource" key={r}>{r}</span>)}
                </div>
                <Link href={`/labs/${lab.slug}`} className="lab-view-link">View &amp; Book →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
