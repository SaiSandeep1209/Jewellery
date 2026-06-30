import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemImage from '../components/ui/ItemImage'
import Loader from '../components/ui/Loader'
import { itemsApi } from '../services/api'
import { inr, enquiryLink, stockLabel, mediaUrl } from '../lib/format'

export default function ItemDetails() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setItem(null)
    setError(false)
    itemsApi.get(id).then(setItem).catch(() => setError(true))
  }, [id])

  if (error) {
    return (
      <div className="container-x pt-36 pb-24 text-center">
        <h1 className="font-serif text-4xl">Piece not found</h1>
        <Link to="/collections" className="btn-outline mt-6">Back to collection</Link>
      </div>
    )
  }
  if (!item) return <div className="pt-28"><Loader /></div>

  const stock = stockLabel(item.quantity)
  const images = item.images?.length ? item.images : [null]

  return (
    <div className="container-x pt-28 pb-8 sm:pt-32">
      <Link to="/collections" className="text-sm text-stone hover:text-gold">← Back to collection</Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <ItemImage item={{ ...item, images: [images[active]] }} className="h-full w-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border ${i === active ? 'border-gold' : 'border-line'}`}
                >
                  <img src={mediaUrl(img)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="eyebrow">{item.category}</span>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{item.name}</h1>
          {item.material && <p className="mt-2 text-sm uppercase tracking-wide text-stone">{item.material}</p>}

          <p className="mt-5 font-serif text-3xl text-ink">{inr(item.price)}</p>
          <p className="mt-1 text-sm text-stone">
            {stock.text}{item.quantity > 0 ? ` · ${item.quantity} available` : ''}
          </p>

          {item.description && <p className="mt-6 max-w-prose text-stone">{item.description}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={enquiryLink(item)} target="_blank" rel="noreferrer" className="btn-gold">
              Enquire on WhatsApp
            </a>
            <Link to="/visit" className="btn-outline">Visit to view</Link>
          </div>

          <p className="mt-6 text-xs text-stone">
            Online purchase isn’t available yet — message us on WhatsApp to check availability,
            request more photos, or reserve a viewing in store.
          </p>
        </div>
      </div>
    </div>
  )
}
