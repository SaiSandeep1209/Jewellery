import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach the admin token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aurelia-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auth ──
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
}

// ── Items ──
export const itemsApi = {
  list: (params = {}) => api.get('/items', { params }).then((r) => r.data),
  categories: () => api.get('/items/categories').then((r) => r.data),
  get: (id) => api.get(`/items/${id}`).then((r) => r.data),
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
