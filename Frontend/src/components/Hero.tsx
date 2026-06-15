import heroImg from '../assets/Labs/Hero.png'

export default function Hero() {
  return (
    <section className="hero-section">
      <img src={heroImg} alt="AI and human connection" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">Welcome to the Future</p>
        <h1 className="hero-title">Where Human Intelligence<br />Meets Artificial Precision</h1>
        <p className="hero-subtitle">
          Lakshya 2047 bridges the gap between human potential and AI-driven innovation.
        </p>
        <div className="hero-actions">
          <a href="#" className="hero-cta-primary">Try Now</a>
          <a href="#" className="hero-cta-secondary">Explore Labs</a>
        </div>
      </div>
    </section>
  )
}
