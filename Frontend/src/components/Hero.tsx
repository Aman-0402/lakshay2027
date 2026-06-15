import heroVideo from '../assets/hero video.mp4'
import HeroTitle from './HeroTitle'
import '../components/HeroTitle.css'

export default function Hero() {
  return (
    <section className="hero-section">
      <video className="hero-bg" src={heroVideo} autoPlay muted loop playsInline />
      <div className="hero-overlay" />

      <HeroTitle />

      <div className="hero-center">
        <div className="hero-ripple">
          <span className="ripple-ring r1" />
          <span className="ripple-ring r2" />
          <span className="ripple-ring r3" />
          <a href="#" className="hero-explore-btn">Explore</a>
        </div>
      </div>

      <p className="hero-bottom-text">
        14 world-class labs.&nbsp; One campus.&nbsp; Built for the innovators of tomorrow.
      </p>
    </section>
  )
}
