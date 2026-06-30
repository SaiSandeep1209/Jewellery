import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  // Restore session from a stored token on load.
  useEffect(() => {
    const token = localStorage.getItem('aurelia-token')
    if (!token) {
      setReady(true)
      return
    }
    authApi
      .me()
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem('aurelia-token'))
      .finally(() => setReady(true))
  }, [])

  const login = async (email, password) => {
    const { token, user } = await authApi.login(email, password)
    localStorage.setItem('aurelia-token', token)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('aurelia-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, ready, isAdmin: user?.role === 'admin', login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
