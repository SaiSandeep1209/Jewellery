import axios from 'axios'
import { fallbackList, fallbackById } from '../data/fallbackItems'

const api = axios.create({ baseURL: '/api' })

// Attach the admin token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aurelia-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const isArray = Array.isArray
const isItem = (x) => x && typeof x === 'object' && x._id

// ── Auth ──
// Guard responses: on a static deploy with no backend, /api/* returns the SPA
// HTML (not JSON), so validate the shape before trusting it.
export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then((r) => {
      if (!r.data || typeof r.data.token !== 'string') {
        throw new Error('Admin API is not available on this deployment.')
      }
      return r.data
    }),
  me: () =>
    api.get('/auth/me').then((r) => {
      if (!r.data || !r.data.user) throw new Error('Invalid session')
      return r.data
    }),
}

// ── Items ── (fall back to the bundled catalogue when the API is unreachable)
export const itemsApi = {
  list: (params = {}) =>
    api
      .get('/items', { params })
      .then((r) => (isArray(r.data) ? r.data : fallbackList(params)))
      .catch(() => fallbackList(params)),

  categories: () =>
    api
      .get('/items/categories')
      .then((r) => (isArray(r.data) ? r.data : []))
      .catch(() => []),

  get: (id) =>
    api
      .get(`/items/${id}`)
      .then((r) => {
        if (isItem(r.data)) return r.data
        const fb = fallbackById(id)
        if (fb) return fb
        throw new Error('Item not found')
      })
      .catch((err) => {
        const fb = fallbackById(id)
        if (fb) return fb
        throw err
      }),

  create: (data) => api.post('/items', data).then((r) => r.data),
  update: (id, data) => api.put(`/items/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/items/${id}`).then((r) => r.data),
}

// ── Upload ──
export const uploadApi = {
  image: (file) => {
    const form = new FormData()
    form.append('image', file)
    return api
      .post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data)
  },
}

export default api
