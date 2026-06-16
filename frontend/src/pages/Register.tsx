import { useState } from 'react'
import { useLocation, Link } from 'wouter'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', first_name: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const [, navigate] = useLocation()

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const u = await register(form)
      navigate(u.is_staff ? '/admin-dashboard' : '/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">JOIN LAKSHYA 2047</p>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Register as a student to book lab sessions.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full Name
            <input className="auth-input" value={form.first_name} onChange={update('first_name')} required />
          </label>
          <label className="auth-label">
            Username
            <input className="auth-input" value={form.username} onChange={update('username')} required />
          </label>
          <label className="auth-label">
            Email
            <input className="auth-input" type="email" value={form.email} onChange={update('email')} required />
          </label>
          <label className="auth-label">
            Password
            <input className="auth-input" type="password" value={form.password} onChange={update('password')} required />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
