import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { ALL_LABS } from '../data/labsData'
import DashboardLayout from '../components/DashboardLayout'

interface Booking {
  id: number
  lab: number
  lab_name: string
  user: { id: number; username: string; email: string; first_name: string }
  date: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [, navigate] = useLocation()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!user.is_staff) { navigate('/dashboard'); return }
    load()
  }, [user, navigate])

  function load() {
    setLoading(true)
    api.getMyBookings()
      .then(setBookings)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }

  async function handleAction(id: number, action: 'approve' | 'reject') {
    setBusyId(id)
    try {
      const updated = action === 'approve' ? await api.approveBooking(id) : await api.rejectBooking(id)
      setBookings(bs => bs.map(b => (b.id === id ? updated : b)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed')
    } finally {
      setBusyId(null)
    }
  }

  if (!user || !user.is_staff) return null

  const pending = bookings.filter(b => b.status === 'pending')
  const approved = bookings.filter(b => b.status === 'approved')
  const rejected = bookings.filter(b => b.status === 'rejected')
  const uniqueStudents = new Set(bookings.map(b => b.user.id)).size

  const filtered = bookings
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        b.user.username.toLowerCase().includes(q) ||
        b.user.first_name.toLowerCase().includes(q) ||
        b.lab_name.toLowerCase().includes(q)
      )
    })

  return (
    <DashboardLayout title="Overview">
      <p className="dl-welcome">Review booking requests and manage lab approvals.</p>

      <div className="dl-cards">
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-total">📋</span>
          <span className="dl-card-num">{bookings.length}</span>
          <span className="dl-card-label">Total Requests</span>
        </div>
        <div className="dl-card dl-card-highlight">
          <span className="dl-card-icon dl-icon-pending">⏳</span>
          <span className="dl-card-num">{pending.length}</span>
          <span className="dl-card-label">Awaiting Review</span>
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
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-labs">🧪</span>
          <span className="dl-card-num">{ALL_LABS.length}</span>
          <span className="dl-card-label">Total Labs</span>
        </div>
        <div className="dl-card">
          <span className="dl-card-icon dl-icon-students">🎓</span>
          <span className="dl-card-num">{uniqueStudents}</span>
          <span className="dl-card-label">Active Students</span>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="dl-alert">
          <strong>{pending.length}</strong> booking request{pending.length > 1 ? 's' : ''} awaiting your review.
        </div>
      )}

      <div className="dl-panel dl-panel-table">
        <div className="dl-panel-header dl-panel-header-controls">
          <h2 className="dl-panel-title">Booking Requests</h2>
          <div className="dl-controls">
            <input
              className="dl-search"
              placeholder="Search student or lab..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="dash-filters">
              {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  className={`dash-filter-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="dl-panel-empty">Loading...</p>
        ) : error ? (
          <p className="dl-panel-empty dl-error-text">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="dl-panel-empty">No bookings in this view.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Student</th><th>Lab</th><th>Date</th><th>Reason</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td className="dash-td-strong">{b.user.first_name || b.user.username}<br /><span className="dash-td-sub">{b.user.email}</span></td>
                    <td>{b.lab_name}</td>
                    <td>{b.date}</td>
                    <td className="dash-td-reason">{b.reason}</td>
                    <td><span className={`dash-status dash-status-${b.status}`}>{b.status}</span></td>
                    <td>
                      {b.status === 'pending' ? (
                        <div className="dash-actions">
                          <button type="button" className="dash-approve-btn" disabled={busyId === b.id} onClick={() => handleAction(b.id, 'approve')}>Approve</button>
                          <button type="button" className="dash-reject-btn" disabled={busyId === b.id} onClick={() => handleAction(b.id, 'reject')}>Reject</button>
                        </div>
                      ) : (
                        <span className="dash-td-sub">—</span>
                      )}
                    </td>
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
