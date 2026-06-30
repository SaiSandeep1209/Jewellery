import { useState } from 'react'
import { firstImage } from '../../lib/format'

/** Item image with a graceful monogram fallback when missing/broken. */
export default function ItemImage({ item, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = firstImage(item)

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-champagne ${className}`} role="img" aria-label={item?.name}>
        <span className="font-serif text-5xl text-gold-deep/70">{(item?.name || '?')[0]}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={item?.name || ''}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
