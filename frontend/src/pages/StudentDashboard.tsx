import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

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

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <p className="dash-eyebrow">STUDENT DASHBOARD</p>
          <h1 className="dash-title">Hi, {user.first_name || user.username}</h1>
          <p className="dash-subtitle">Track your lab booking requests below.</p>
        </div>
        <Link href="/labs" className="dash-cta">Book a New Lab →</Link>
      </div>

      <div className="dash-stats">
        <div className="dash-stat"><span className="dash-stat-num">{pending.length}</span><span className="dash-stat-label">Pending</span></div>
        <div className="dash-stat"><span className="dash-stat-num">{approved.length}</span><span className="dash-stat-label">Approved</span></div>
        <div className="dash-stat"><span className="dash-stat-num">{rejected.length}</span><span className="dash-stat-label">Rejected</span></div>
      </div>

      {loading ? (
        <p className="dash-empty">Loading...</p>
      ) : error ? (
        <p className="dash-error">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="dash-empty">No bookings yet. <Link href="/labs">Browse labs →</Link></p>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Lab</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td className="dash-td-strong">{b.lab_name}</td>
                  <td>{b.date}</td>
                  <td className="dash-td-reason">{b.reason}</td>
                  <td>
                    <span className={`dash-status dash-status-${b.status}`}>{STATUS_LABEL[b.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
