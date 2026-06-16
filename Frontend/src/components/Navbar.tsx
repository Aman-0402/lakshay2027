import { useEffect, useState } from 'react'
import { useLocation, Link } from 'wouter'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [location, navigate] = useLocation()
  const isHome = location === '/'
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const forceScrolled = !isHome || scrolled

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className={`navbar${forceScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          LAKSHYA 2047<sup>®</sup>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/labs" className={location.startsWith('/labs') ? 'nav-active' : ''}>Labs</Link></li>
          <li><a href="#">Insights</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="#">My Team</a></li>
        </ul>
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-username">Hi, {user.first_name || user.username}</span>
              <button type="button" className="navbar-login navbar-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar-login">Login</Link>
              <Link href="/register" className="navbar-cta">Try Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
