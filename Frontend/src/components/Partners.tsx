import { useInView } from '../hooks/useInView'
import parulImg from '../assets/Logo/parul.png'
import nsdcImg from '../assets/Logo/NSDC.png'
import ethnotechImg from '../assets/Logo/ethnotech.png'

const partners = [
  {
    name: 'PARUL UNIVERSITY',
    img: parulImg,
    role: 'Academic Host',
    desc: 'Provides the campus, infrastructure, and academic framework hosting all 12+ labs.',
  },
  {
    name: 'NATIONAL SKILL DEVELOPMENT CORPORATION (NSDC)',
    img: nsdcImg,
    role: 'Skill Certification Partner',
    desc: 'Aligns training programs with national skill standards and certification pathways.',
  },
  {
    name: 'ETHNOTECH ACADEMY',
    img: ethnotechImg,
    role: 'Training Delivery Partner',
    desc: 'Supplies trainers and campus managers running day-to-day lab sessions.',
  },
]

export default function Partners() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()
  const { ref: ctaRef, visible: ctaVisible } = useInView()

  return (
    <section className="partners-section" id="partners">
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
            <span className="partner-role">{p.role}</span>
            <p className="partner-name">{p.name}</p>
            <p className="partner-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <div
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        className={`partners-cta reveal${ctaVisible ? ' visible' : ''}`}
      >
        <h3 className="partners-cta-title">Want to partner with Lakshya 2047?</h3>
        <p className="partners-cta-text">
          We collaborate with universities, companies, and skill bodies to build future-ready labs.
        </p>
        <a href="mailto:partnerships@lakshya2047.com" className="partners-cta-btn">Get in Touch →</a>
      </div>
    </section>
  )
}
