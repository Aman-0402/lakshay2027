import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { getLabImage, type Lab } from '../hooks/useLabs'

export default function LabDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const [, navigate] = useLocation()

  const [lab, setLab] = useState<Lab | null>(null)
  const [labLoading, setLabLoading] = useState(true)
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const toISO = (d: Date) => d.toISOString().slice(0, 10)
  const today = new Date()
  const twoWeeksOut = new Date(today)
  twoWeeksOut.setDate(today.getDate() + 14)
  const minDate = toISO(today)
  const maxDate = toISO(twoWeeksOut)

  useEffect(() => {
    if (!slug) return
    api.getLab(slug)
      .then(setLab)
      .catch(() => setLab(null))
      .finally(() => setLabLoading(false))
  }, [slug])

  if (labLoading) {
    return <div className="ld-not-found"><p>Loading...</p></div>
  }

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
      await api.createBooking({ lab: lab!.id, date, reason })
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
        <img src={getLabImage(lab)} alt={lab.name} className="ld-hero-img" />
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
          <p className="ld-desc">{lab.description}</p>

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

          {!lab.available && (
            <p className="ld-login-notice">This lab is currently unavailable for booking.</p>
          )}

          {!user && lab.available && (
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
                  min={minDate}
                  max={maxDate}
                  required
                  disabled={!user || !lab.available}
                />
              </label>
              <p className="ld-date-hint">Bookable window: today through 2 weeks ahead ({minDate} – {maxDate})</p>
              <label className="ld-label">
                Reason / Project Description
                <textarea
                  className="ld-textarea"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Describe your project and why you need this lab. A clear, specific reason improves approval chances."
                  required
                  disabled={!user || !lab.available}
                  rows={5}
                />
              </label>

              {error && <p className="ld-error">{error}</p>}

              <button type="submit" className="ld-submit" disabled={!user || !lab.available || loading}>
                {loading ? 'Submitting...' : 'Request Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
