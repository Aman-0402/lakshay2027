import heroVideo from '../assets/hero video.mp4'

export default function Hero() {
  return (
    <section className="hero-section">
      <video
        className="hero-bg"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          Where Future Skills<br />Are Built.
        </h1>
        <p className="hero-subtitle">
          14 world-class labs. One campus. Built for the innovators of tomorrow.
        </p>
        <div className="hero-actions">
          <a href="#" className="hero-cta-primary">Try Now</a>
          <a href="#" className="hero-cta-secondary">Explore Labs</a>
        </div>
        <div className="hero-trust">
          <span className="hero-trust-item">Supported by Industry Leaders</span>
          <span className="hero-trust-divider">·</span>
          <span className="hero-trust-item">Trusted by teams of every scale</span>
        </div>
      </div>
    </section>
  )
}
