const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
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

  getLabs: (params?: { search?: string; category?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString()
    return request(`/labs/${qs ? `?${qs}` : ''}`)
  },

  getLab: (slug: string) => request(`/labs/${slug}/`),

  createBooking: (data: { lab: number; date: string; reason: string }) =>
    request('/bookings/', { method: 'POST', body: JSON.stringify(data) }),

  getMyBookings: () => request('/bookings/'),
}
