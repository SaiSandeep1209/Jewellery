import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ItemImage from './ui/ItemImage'
import { inr, enquiryLink, stockLabel, grams } from '../lib/format'

const toneClass = {
  ok: 'text-emerald-700',
  low: 'text-amber-700',
  muted: 'text-stone',
}

export default function ItemCard({ item }) {
  const stock = stockLabel(item.quantity)
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
    >
      <Link to={`/item/${item._id}`} className="relative block aspect-[4/5] overflow-hidden">
        <ItemImage
          item={item}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-wide text-stone backdrop-blur">
          {item.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/item/${item._id}`}>
          <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-gold-deep">
            {item.name}
          </h3>
        </Link>
        {(item.material || item.weight) && (
          <p className="mt-0.5 text-xs uppercase tracking-wide text-stone">
            {[item.material, grams(item.weight)].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-serif text-2xl text-ink">{inr(item.price)}</span>
          <span className={`text-xs font-medium ${toneClass[stock.tone]}`}>{stock.text}</span>
        </div>

        <a
          href={enquiryLink(item)}
          target="_blank"
          rel="noreferrer"
          className="btn-outline mt-5 w-full !py-2.5 text-sm"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </motion.article>
  )
}
