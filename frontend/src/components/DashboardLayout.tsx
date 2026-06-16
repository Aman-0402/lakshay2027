import type { ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'

interface NavItem {
  label: string
  href: string
  icon: ReactNode
}

const ICONS = {
  overview: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
    </svg>
  ),
  bookings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  labs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v6l5 9a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3l5-9V3z" />
    </svg>
  ),
}

export default function DashboardLayout({ children, title }: { children: ReactNode; title: string }) {
  const { user, logout } = useAuth()
  const [location, navigate] = useLocation()

  if (!user) return null

  const isAdmin = user.is_staff
  const navItems: NavItem[] = isAdmin
    ? [
        { label: 'Overview', href: '/admin-dashboard', icon: ICONS.overview },
        { label: 'Manage Labs', href: '/admin-dashboard/labs', icon: ICONS.labs },
      ]
    : [
        { label: 'Overview', href: '/dashboard', icon: ICONS.overview },
        { label: 'Browse Labs', href: '/labs', icon: ICONS.labs },
      ]

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="dl-shell">
      <aside className="dl-sidebar">
        <div className="dl-sidebar-top">
          <Link href="/" className="dl-logo">LAKSHYA 2047<sup>®</sup></Link>
          <span className="dl-role-badge">{isAdmin ? 'ADMIN' : 'STUDENT'}</span>
        </div>

        <nav className="dl-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`dl-nav-item${location === item.href ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="dl-sidebar-bottom">
          <div className="dl-user-card">
            <div className="dl-avatar">{(user.first_name || user.username)[0].toUpperCase()}</div>
            <div className="dl-user-info">
              <span className="dl-user-name">{user.first_name || user.username}</span>
              <span className="dl-user-email">{user.email}</span>
            </div>
          </div>
          <button type="button" className="dl-logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="dl-main">
        <h1 className="dl-page-title">{title}</h1>
        {children}
      </main>
    </div>
  )
}
