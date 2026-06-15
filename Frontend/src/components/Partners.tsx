import { useInView } from '../hooks/useInView'
import parulImg from '../assets/Logo/parul.png'
import nsdcImg from '../assets/Logo/NSDC.png'
import ethnotechImg from '../assets/Logo/ethnotech.png'

const partners = [
  { name: 'PARUL UNIVERSITY', img: parulImg },
  { name: 'NATIONAL SKILL DEVELOPMENT CORPORATION (NSDC)', img: nsdcImg },
  { name: 'ETHNOTECH ACADEMY', img: ethnotechImg },
]

export default function Partners() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()

  return (
    <section className="partners-section">
      <div
        ref={headRef as React.RefObject<HTMLDivElement>}
        className={`partners-header reveal${headVisible ? ' visible' : ''}`}
      >
        <p className="partners-eyebrow">TRUSTED COLLABORATORS</p>
        <h2 className="partners-title">OUR PARTNERS</h2>
        <p className="partners-subtitle">
          Backed by industry leaders and academic institutions driving the future of innovation.
        </p>
      </div>
      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className={`partners-grid stagger${gridVisible ? ' visible' : ''}`}
      >
        {partners.map(p => (
          <div className="partner-card" key={p.name}>
            <img src={p.img} alt={p.name} className="partner-logo" />
            <p className="partner-name">{p.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
