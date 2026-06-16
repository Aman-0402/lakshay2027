import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { useLabs, getLabImage } from '../hooks/useLabs'
import DashboardLayout from '../components/DashboardLayout'

const CATEGORY_OPTIONS = [
  'ROBOTICS', 'DESIGN', 'EXTENDED REALITY', 'CLOUD', 'NETWORKING',
  'IoT', 'AUTOMATION', 'SOFTWARE', 'AI / GPU', 'ELECTRONICS', 'OTHER',
]

export default function ManageLabs() {
  const { user } = useAuth()
  const [, navigate] = useLocation()
  const { labs, loading, error, reload } = useLabs()
  const [busySlug, setBusySlug] = useState<string | null>(null)
  const [actionError, setActionError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '', category: CATEGORY_OPTIONS[0], description: '', resources: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!user.is_staff) { navigate('/dashboard'); return }
  }, [user, navigate])

  if (!user || !user.is_staff) return null

  async function toggleField(slug: string, field: 'featured' | 'available', value: boolean) {
    setBusySlug(slug)
    setActionError('')
    try {
      await api.updateLab(slug, { [field]: !value })
      reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setBusySlug(null)
    }
  }

  async function handleDelete(slug: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    setBusySlug(slug)
    setActionError('')
    try {
      await api.deleteLab(slug)
      reload()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Delete failed — this lab may be permanent.')
    } finally {
      setBusySlug(null)
    }
  }

  async function handleAddLab(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('category', form.category)
      fd.append('description', form.description)
      fd.append('resources', JSON.stringify(form.resources.split(',').map(r => r.trim()).filter(Boolean)))
      if (image) fd.append('image', image)
      await api.createLab(fd)
      setForm({ name: '', category: CATEGORY_OPTIONS[0], description: '', resources: '' })
      setImage(null)
      setShowForm(false)
      reload()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create lab')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout title="Manage Labs">
      <p className="dl-welcome">
        {labs.length} total labs. Permanent labs (★) cannot be deleted but can be toggled featured/available.
      </p>

      <div className="ml-toolbar">
        <button type="button" className="dl-cta-btn ml-add-btn" onClick={() => setShowForm(s => !s)}>
          {showForm ? 'Cancel' : '+ Add New Lab'}
        </button>
      </div>

      {showForm && (
        <div className="dl-panel ml-form-panel">
          <h2 className="dl-panel-title">New Lab</h2>
          <form className="ml-form" onSubmit={handleAddLab}>
            <div className="ml-form-row">
              <label className="ld-label">
                Name
                <input
                  className="ld-input"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>
              <label className="ld-label">
                Category
                <select
                  className="ld-input"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <label className="ld-label">
              Description
              <textarea
                className="ld-textarea"
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
              />
            </label>
            <label className="ld-label">
              Resources (comma separated, e.g. "2 ROBOT, 30 CPU")
              <input
                className="ld-input"
                value={form.resources}
                onChange={e => setForm(f => ({ ...f, resources: e.target.value }))}
                placeholder="2 ROBOT, 30 CPU"
              />
            </label>
            <label className="ld-label">
              Image (optional)
              <input
                type="file"
                accept="image/*"
                className="ld-input"
                onChange={e => setImage(e.target.files?.[0] || null)}
              />
            </label>

            {formError && <p className="dash-error">{formError}</p>}

            <button type="submit" className="ld-submit ml-submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Lab'}
            </button>
          </form>
        </div>
      )}

      {actionError && <p className="dash-error ml-action-error">{actionError}</p>}

      <div className="dl-panel dl-panel-table">
        {loading ? (
          <p className="dl-panel-empty">Loading...</p>
        ) : error ? (
          <p className="dl-panel-empty dl-error-text">{error}</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Lab</th><th>Category</th><th>Featured</th><th>Available</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {labs.map(lab => (
                  <tr key={lab.id}>
                    <td className="dash-td-strong">
                      <div className="ml-lab-cell">
                        <img src={getLabImage(lab)} alt={lab.name} className="ml-thumb" />
                        {lab.name} {lab.is_permanent && <span title="Permanent lab">★</span>}
                      </div>
                    </td>
                    <td>{lab.category}</td>
                    <td>
                      <button
                        type="button"
                        className={`ml-toggle${lab.featured ? ' on' : ''}`}
                        disabled={busySlug === lab.slug}
                        onClick={() => toggleField(lab.slug, 'featured', lab.featured)}
                      >
                        {lab.featured ? 'ON' : 'OFF'}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`ml-toggle${lab.available ? ' on' : ''}`}
                        disabled={busySlug === lab.slug}
                        onClick={() => toggleField(lab.slug, 'available', lab.available)}
                      >
                        {lab.available ? 'ON' : 'OFF'}
                      </button>
                    </td>
                    <td>
                      {lab.is_permanent ? (
                        <span className="dash-td-sub">Protected</span>
                      ) : (
                        <button
                          type="button"
                          className="dash-reject-btn"
                          disabled={busySlug === lab.slug}
                          onClick={() => handleDelete(lab.slug, lab.name)}
                        >
                          Delete
                        </button>
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
