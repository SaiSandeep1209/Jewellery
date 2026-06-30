import RequireAdmin from '../components/RequireAdmin'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function Admin() {
  return (
    <RequireAdmin fallback={<AdminLogin />}>
      <AdminDashboard />
    </RequireAdmin>
  )
}
