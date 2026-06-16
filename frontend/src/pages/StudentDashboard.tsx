import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import DashboardLayout from '../components/DashboardLayout'

interface Booking {
  id: number
  lab: number
  lab_name: string
  date: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const [, navigate] = useLocation()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.getMyBookings()
      .then(setBookings)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }, [user, navigate])

  if (!user) return null

  const pending = bookings.filter(b => b.status === 'pending')
  const approved = bookings.filter(b => b.status === 'approved')
  const rejected = bookings.filter(b => b.status === 'rejected')
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = approved.filter(b => b.date >= today).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <DashboardLayout title="Overview">
      <p className="dl-welcome">Welcome back, {user.first_name || user.username}. Here's your booking activity.</p>

      <div className="dl-cards">
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-total">📋</span>
          <span className="dl-card-num">{bookings.length}</span>
          <span className="dl-card-label">Total Requests</span>
        </div>
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-pending">⏳</span>
          <span className="dl-card-num">{pending.length}</span>
          <span className="dl-card-label">Pending Review</span>
        </div>
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-approved">✓</span>
          <span className="dl-card-num">{approved.length}</span>
          <span className="dl-card-label">Approved</span>
        </div>
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-rejected">✕</span>
          <span className="dl-card-num">{rejected.length}</span>
          <span className="dl-card-label">Rejected</span>
        </div>
      </div>

      <div className="dl-grid-2col">
        <div className="dl-panel">
          <div className="dl-panel-header">
            <h2 className="dl-panel-title">Upcoming Sessions</h2>
          </div>
          {upcoming.length === 0 ? (
            <p className="dl-panel-empty">No upcoming approved sessions.</p>
          ) : (
            <div className="dl-upcoming-list">
              {upcoming.map(b => (
                <div className="dl-upcoming-item" key={b.id}>
                  <div className="dl-upcoming-date">
                    <span className="dl-upcoming-day">{new Date(b.date).getDate()}</span>
                    <span className="dl-upcoming-month">{new Date(b.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="dl-upcoming-info">
                    <span className="dl-upcoming-lab">{b.lab_name}</span>
                    <span className="dl-upcoming-reason">{b.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dl-panel dl-panel-cta">
          <h2 className="dl-panel-title">Need a lab?</h2>
          <p className="dl-panel-text">Browse 12 labs across robotics, AI, cloud, design, and more.</p>
          <Link href="/labs" className="dl-cta-btn">Browse Labs →</Link>
        </div>
      </div>

      <div className="dl-panel dl-panel-table">
        <div className="dl-panel-header">
          <h2 className="dl-panel-title">All Requests</h2>
        </div>
        {loading ? (
          <p className="dl-panel-empty">Loading...</p>
        ) : error ? (
          <p className="dl-panel-empty dl-error-text">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="dl-panel-empty">No bookings yet. <Link href="/labs">Browse labs →</Link></p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Lab</th><th>Date</th><th>Reason</th><th>Status</th></tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td className="dash-td-strong">{b.lab_name}</td>
                    <td>{b.date}</td>
                    <td className="dash-td-reason">{b.reason}</td>
                    <td><span className={`dash-status dash-status-${b.status}`}>{STATUS_LABEL[b.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
