import { useAuth } from '../context/AuthContext'
import Loader from './ui/Loader'

/** Gate admin-only UI. Shows the login screen (passed as `fallback`) when signed out. */
export default function RequireAdmin({ children, fallback }) {
  const { ready, isAdmin } = useAuth()
  if (!ready) return <Loader label="Checking session…" />
  if (!isAdmin) return fallback
  return children
}
