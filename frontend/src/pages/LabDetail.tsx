import { useState } from 'react'
import { useParams, Link, useLocation } from 'wouter'
import { ALL_LABS } from '../data/labsData'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function LabDetail() {
  const { slug } = useParams<{ slug: string }>()
  const lab = ALL_LABS.find(l => l.slug === slug)
  const { user } = useAuth()
  const [, navigate] = useLocation()

  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!lab) {
    return (
      <div className="ld-not-found">
        <p>Lab not found.</p>
        <Link href="/labs">← Back to Labs</Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setError('')
    setLoading(true)
    try {
      // resolve backend lab id by slug (DB labs seeded to match same slugs)
      const dbLab = await api.getLab(lab!.slug)
      await api.createBooking({ lab: dbLab.id, date, reason })
      setSuccess(true)
      setDate('')
      setReason('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed — try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ld-page">
      <section className="ld-hero">
        <img src={lab.img} alt={lab.name} className="ld-hero-img" />
        <div className="ld-hero-overlay" />
        <div className="ld-hero-content">
          <Link href="/labs" className="ld-back">← All Labs</Link>
          <span className="ld-cat">{lab.category}</span>
          <h1 className="ld-title">{lab.name}</h1>
        </div>
      </section>

      <div className="ld-body">
        <div className="ld-info">
          <h2 className="ld-section-title">About this lab</h2>
          <p className="ld-desc">{lab.desc}</p>

          <h3 className="ld-resources-title">Available Resources</h3>
          <div className="ld-resources">
            {lab.resources.map(r => (
              <span className="ld-resource-tag" key={r}>⚡ {r}</span>
            ))}
          </div>
        </div>

        <div className="ld-booking-card">
          <h2 className="ld-booking-title">Book a Session</h2>
          <p className="ld-booking-subtitle">
            Submit a request with your project reason. Admin will review and approve.
          </p>

          {!user && (
            <p className="ld-login-notice">
              <Link href="/login">Login</Link> to book this lab.
            </p>
          )}

          {success ? (
            <p className="ld-success">
              ✓ Request submitted! Status: <strong>Pending Admin Approval</strong>
            </p>
          ) : (
            <form className="ld-form" onSubmit={handleSubmit}>
              <label className="ld-label">
                Preferred Date
                <input
                  type="date"
                  className="ld-input"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  disabled={!user}
                />
              </label>
              <label className="ld-label">
                Reason / Project Description
                <textarea
                  className="ld-textarea"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Describe your project and why you need this lab. A clear, specific reason improves approval chances."
                  required
                  disabled={!user}
                  rows={5}
                />
              </label>

              {error && <p className="ld-error">{error}</p>}

              <button type="submit" className="ld-submit" disabled={!user || loading}>
                {loading ? 'Submitting...' : 'Request Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
