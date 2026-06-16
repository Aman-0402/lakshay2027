import { createContext, useContext, useState, type ReactNode } from 'react'
import { api } from '../lib/api'

interface User {
  id: number
  username: string
  email: string
  first_name: string
  is_staff: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (data: { username: string; email: string; password: string; first_name?: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  function persist(token: string, user: User) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  async function login(username: string, password: string) {
    const res = await api.login(username, password)
    persist(res.token, res.user)
  }

  async function register(data: { username: string; email: string; password: string; first_name?: string }) {
    const res = await api.register(data)
    persist(res.token, res.user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
