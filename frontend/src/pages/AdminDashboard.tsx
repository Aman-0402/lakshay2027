import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

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
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <p className="dash-eyebrow">ADMIN DASHBOARD</p>
          <h1 className="dash-title">Booking Requests</h1>
          <p className="dash-subtitle">Review reasons and approve or reject lab booking requests.</p>
        </div>
      </div>

      <div className="dash-stats">
        <div className="dash-stat"><span className="dash-stat-num">{pending.length}</span><span className="dash-stat-label">Pending</span></div>
        <div className="dash-stat"><span className="dash-stat-num">{approved.length}</span><span className="dash-stat-label">Approved</span></div>
        <div className="dash-stat"><span className="dash-stat-num">{rejected.length}</span><span className="dash-stat-label">Rejected</span></div>
      </div>

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

      {loading ? (
        <p className="dash-empty">Loading...</p>
      ) : error ? (
        <p className="dash-error">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="dash-empty">No bookings in this view.</p>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Lab</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
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
                        <button
                          type="button"
                          className="dash-approve-btn"
                          disabled={busyId === b.id}
                          onClick={() => handleAction(b.id, 'approve')}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="dash-reject-btn"
                          disabled={busyId === b.id}
                          onClick={() => handleAction(b.id, 'reject')}
                        >
                          Reject
                        </button>
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
  )
}
