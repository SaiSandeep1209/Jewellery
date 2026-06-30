import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemForm from './ItemForm'
import Loader from '../ui/Loader'
import ItemImage from '../ui/ItemImage'
import { useAuth } from '../../context/AuthContext'
import { itemsApi } from '../../services/api'
import { inr, grams } from '../../lib/format'
import { site } from '../../config/site'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [items, setItems] = useState(null)
  const [editing, setEditing] = useState(null) // item being edited, or null
  const [showForm, setShowForm] = useState(false)

  const load = () => itemsApi.list().then(setItems).catch(() => setItems([]))
  useEffect(() => { load() }, [])

  const handleSaved = () => {
    setEditing(null)
    setShowForm(false)
    load()
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete “${item.name}”? This cannot be undone.`)) return
    await itemsApi.remove(item._id)
    load()
  }

  const startAdd = () => { setEditing(null); setShowForm(true) }
  const startEdit = (item) => { setEditing(item); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="container-x pt-28 pb-20 sm:pt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-2 font-serif text-4xl text-ink">Manage catalogue</h1>
          <p className="mt-1 text-sm text-stone">Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/collections" className="btn-outline">View store</Link>
          <button onClick={logout} className="btn-outline">Sign out</button>
        </div>
      </div>

      {/* Add / Edit form */}
      <div className="mt-8">
        {showForm ? (
          <ItemForm item={editing} onSaved={handleSaved} onCancel={() => { setShowForm(false); setEditing(null) }} />
        ) : (
          <button onClick={startAdd} className="btn-gold">+ Add new item</button>
        )}
      </div>

      {/* Items table */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-xl text-ink">Items {items ? `(${items.length})` : ''}</h2>
        </div>

        {items === null ? (
          <Loader />
        ) : items.length === 0 ? (
          <p className="px-5 py-12 text-center text-stone">No items yet. Add your first piece above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-sand text-xs uppercase tracking-wide text-stone">
                <tr>
                  <th className="px-5 py-3">Item</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Weight</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-t border-line">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <ItemImage item={item} className="h-12 w-12 shrink-0 rounded-md object-cover" />
                        <span className="font-medium text-ink">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone">{item.category}</td>
                    <td className="px-5 py-3 text-ink">{inr(item.price)}</td>
                    <td className="px-5 py-3 text-stone">{grams(item.weight) || '—'}</td>
                    <td className={`px-5 py-3 ${item.quantity <= 0 ? 'text-red-600' : item.quantity <= 3 ? 'text-amber-700' : 'text-ink'}`}>
                      {item.quantity}
                    </td>
                    <td className="px-5 py-3">{item.featured ? '★' : '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(item)} className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold hover:text-gold">Edit</button>
                        <button onClick={() => handleDelete(item)} className="rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-stone">{site.name} · Items here appear instantly in the public catalogue.</p>
    </div>
  )
}
