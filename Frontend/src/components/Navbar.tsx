import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()
  const isHome = location === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const forceScrolled = !isHome || scrolled

  return (
    <nav className={`navbar${forceScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          LAKSHYA 2047<sup>®</sup>
        </a>
        <ul className="navbar-links">
          <li><a href="/labs" className={location === '/labs' ? 'nav-active' : ''}>Labs</a></li>
          <li><a href="#">Insights</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="#">My Team</a></li>
        </ul>
        <div className="navbar-actions">
          <a href="#" className="navbar-login">Login</a>
          <a href="#" className="navbar-cta">Try Now</a>
        </div>
      </div>
    </nav>
  )
}
