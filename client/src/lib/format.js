import { site } from '../config/site'

// Server base — empty in dev (Vite proxy handles /api and /uploads).
const API_BASE = import.meta.env.VITE_API_BASE || ''

/** Format INR like 145000 -> "₹1,45,000". */
export const inr = (n) =>
  '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })

/** Resolve an item image path to a usable URL (absolute URLs pass through). */
export function mediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_BASE}${path}`
}

/** First image of an item, or '' if none. */
export const firstImage = (item) => mediaUrl(item?.images?.[0])

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message) {
  const base = `https://wa.me/${site.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Pre-filled enquiry message for a specific item. */
export function enquiryLink(item) {
  return whatsappLink(
    `Hello ${site.name}! I'd like to enquire about "${item.name}" (${inr(item.price)}). Is it available?`,
  )
}

/** Weight label, e.g. 12.5 -> "12.5 g" (empty if no weight). */
export const grams = (w) => (w ? `${w} g` : '')

/** Stock label from quantity. */
export function stockLabel(qty) {
  if (qty <= 0) return { text: 'Enquire for availability', tone: 'muted' }
  if (qty <= 3) return { text: `Only ${qty} in store`, tone: 'low' }
  return { text: 'In store', tone: 'ok' }
}
