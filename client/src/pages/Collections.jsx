import { useEffect, useMemo, useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import ItemCard from '../components/ItemCard'
import Loader from '../components/ui/Loader'
import { itemsApi } from '../services/api'

export default function Collections() {
  const [items, setItems] = useState(null)
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    itemsApi.list().then(setItems).catch(() => setItems([]))
  }, [])

  const categories = useMemo(() => {
    if (!items) return ['All']
    return ['All', ...Array.from(new Set(items.map((i) => i.category))).sort()]
  }, [items])

  const filtered = useMemo(() => {
    if (!items) return []
    const q = query.trim().toLowerCase()
    return items.filter((i) => {
      const catOk = active === 'All' || i.category === active
      const qOk = !q || `${i.name} ${i.material} ${i.category}`.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [items, active, query])

  return (
    <div className="container-x pt-28 pb-10 sm:pt-32">
      <SectionTitle eyebrow="The Collection" title="Available in store" center
        subtitle="Browse what’s currently on display. Enquire on WhatsApp to check a piece or reserve a viewing." />

      {/* Controls */}
      <div className="mt-10 flex flex-col items-center gap-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rings, necklaces, gold…"
          className="field max-w-md text-center"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active === c ? 'bg-ink text-ivory' : 'border border-line text-stone hover:border-gold hover:text-gold'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {items === null ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <p className="py-20 text-center text-stone">No pieces match your search.</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
