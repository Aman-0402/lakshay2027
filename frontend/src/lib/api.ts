const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const ORIGIN_URL = API_URL.replace(/\/api\/?$/, '')

function getToken() {
  return localStorage.getItem('token')
}

export function resolveImageUrl(path?: string | null) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${ORIGIN_URL}${path}`
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()
  const isFormData = options.body instanceof FormData
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Token ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || JSON.stringify(body) || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  login: (username: string, password: string) =>
    request('/auth/login/', { method: 'POST', body: JSON.stringify({ username, password }) }),

  register: (data: { username: string; email: string; password: string; first_name?: string }) =>
    request('/auth/register/', { method: 'POST', body: JSON.stringify(data) }),

  me: () => request('/auth/me/'),

  getLabs: (params?: { search?: string; category?: string; featured?: boolean }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString()
    return request(`/labs/${qs ? `?${qs}` : ''}`)
  },

  getLab: (slug: string) => request(`/labs/${slug}/`),

  createLab: (data: FormData) => request('/labs/', { method: 'POST', body: data }),

  updateLab: (slug: string, data: FormData | Record<string, unknown>) =>
    request(`/labs/${slug}/`, {
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  deleteLab: (slug: string) => request(`/labs/${slug}/`, { method: 'DELETE' }),

  createBooking: (data: { lab: number; date: string; reason: string }) =>
    request('/bookings/', { method: 'POST', body: JSON.stringify(data) }),

  getMyBookings: () => request('/bookings/'),

  approveBooking: (id: number) => request(`/bookings/${id}/approve/`, { method: 'POST' }),

  rejectBooking: (id: number) => request(`/bookings/${id}/reject/`, { method: 'POST' }),
}
