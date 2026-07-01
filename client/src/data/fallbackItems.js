/**
 * Bundled sample catalogue used when the API isn't reachable (e.g. the static
 * Netlify deploy has no backend). In local dev / with a hosted API, the real
 * data from the server is used instead — this is only a graceful fallback so
 * the site is never blank.
 */
export const fallbackItems = [
  { _id: 'sample-1', name: 'Aurelia Solitaire Ring', category: 'Rings', material: '18K Gold · Diamond', price: 145000, weight: 4.5, quantity: 4, featured: true, description: 'A timeless brilliant-cut solitaire set in hand-finished 18K gold.', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80'] },
  { _id: 'sample-2', name: 'Étoile Diamond Necklace', category: 'Necklaces', material: '18K White Gold · Diamond', price: 268000, weight: 18, quantity: 2, featured: true, description: 'A delicate constellation of diamonds on a fluid white-gold chain.', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80'] },
  { _id: 'sample-3', name: 'Lumière Drop Earrings', category: 'Earrings', material: '22K Gold', price: 98000, weight: 6.5, quantity: 6, featured: true, description: 'Sculptural gold drops that catch the light with every movement.', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80'] },
  { _id: 'sample-4', name: 'Heritage Gold Bangle', category: 'Bangles', material: '22K Gold', price: 132000, weight: 24, quantity: 5, featured: false, description: 'A hand-engraved bangle inspired by heirloom craftsmanship.', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80'] },
  { _id: 'sample-5', name: 'Seraphine Pearl Studs', category: 'Earrings', material: 'Akoya Pearl · 18K Gold', price: 54000, weight: 3.2, quantity: 10, featured: false, description: 'Lustrous Akoya pearls cradled in minimal gold settings.', images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=900&q=80'] },
  { _id: 'sample-6', name: 'Celeste Tennis Bracelet', category: 'Bracelets', material: '18K Gold · Diamond', price: 312000, weight: 14, quantity: 1, featured: true, description: 'A continuous line of graduated diamonds — quiet, enduring luxury.', images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80'] },
  { _id: 'sample-7', name: 'Vœu Eternity Band', category: 'Rings', material: 'Platinum · Diamond', price: 187000, weight: 3.8, quantity: 3, featured: false, description: 'Full-circle diamonds in platinum — a promise without end.', images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=80'] },
  { _id: 'sample-8', name: 'Aria Pendant', category: 'Necklaces', material: '18K Gold · Emerald', price: 156000, weight: 5.5, quantity: 2, featured: false, description: 'A single emerald suspended on a whisper-fine gold chain.', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80'] },
  { _id: 'sample-9', name: 'Luna Silver Anklet', category: 'Silver', material: '925 Sterling Silver', price: 3200, weight: 12, quantity: 15, featured: true, description: 'A dainty sterling silver anklet with a soft, everyday shine.', images: ['https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=900&q=80'] },
  { _id: 'sample-10', name: 'Aria Silver Toe Rings', category: 'Silver', material: '925 Sterling Silver', price: 1800, weight: 6, quantity: 20, featured: false, description: 'Classic adjustable silver toe rings, sold as a pair.', images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80'] },
  { _id: 'sample-11', name: 'Vera Silver Oxidised Jhumkas', category: 'Silver', material: '925 Oxidised Silver', price: 4200, weight: 9, quantity: 10, featured: true, description: 'Hand-crafted oxidised silver jhumkas with an antique finish.', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80'] },
  { _id: 'sample-12', name: 'Mira Silver Chain Bracelet', category: 'Silver', material: '925 Sterling Silver', price: 2600, weight: 8, quantity: 18, featured: false, description: 'A sleek sterling silver chain bracelet for daily wear.', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80'] },
]

export function fallbackList(params = {}) {
  let list = fallbackItems
  if (params.featured === 'true') list = list.filter((i) => i.featured)
  if (params.category && params.category !== 'All') list = list.filter((i) => i.category === params.category)
  return list
}

export const fallbackById = (id) => fallbackItems.find((i) => i._id === id) || null
