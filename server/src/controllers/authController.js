import AdminUser from '../models/AdminUser.js'
import { signToken } from '../middleware/auth.js'

export async function login(req, res) {
  const { email, password } = req.body || {}
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }
  const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() })
  if (!user || !(await user.verifyPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  })
}

export async function me(req, res) {
  res.json({ user: req.user })
}
