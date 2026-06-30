import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB, disconnectDB } from '../config/db.js'
import AdminUser from '../models/AdminUser.js'
import Item from '../models/Item.js'

// Sample catalogue (placeholder Unsplash images — swap from the admin page).
const SAMPLE_ITEMS = [
  { name: 'Aurelia Solitaire Ring', category: 'Rings', material: '18K Gold · Diamond', price: 145000, weight: 4.5, quantity: 4, featured: true, description: 'A timeless brilliant-cut solitaire set in hand-finished 18K gold.', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80'] },
  { name: 'Étoile Diamond Necklace', category: 'Necklaces', material: '18K White Gold · Diamond', price: 268000, weight: 18, quantity: 2, featured: true, description: 'A delicate constellation of diamonds on a fluid white-gold chain.', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80'] },
  { name: 'Lumière Drop Earrings', category: 'Earrings', material: '22K Gold', price: 98000, weight: 6.5, quantity: 6, featured: true, description: 'Sculptural gold drops that catch the light with every movement.', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80'] },
  { name: 'Heritage Gold Bangle', category: 'Bangles', material: '22K Gold', price: 132000, weight: 24, quantity: 5, featured: false, description: 'A hand-engraved bangle inspired by heirloom craftsmanship.', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80'] },
  { name: 'Seraphine Pearl Studs', category: 'Earrings', material: 'Akoya Pearl · 18K Gold', price: 54000, weight: 3.2, quantity: 10, featured: false, description: 'Lustrous Akoya pearls cradled in minimal gold settings.', images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=900&q=80'] },
  { name: 'Celeste Tennis Bracelet', category: 'Bracelets', material: '18K Gold · Diamond', price: 312000, weight: 14, quantity: 1, featured: true, description: 'A continuous line of graduated diamonds — quiet, enduring luxury.', images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80'] },
  { name: 'Vœu Eternity Band', category: 'Rings', material: 'Platinum · Diamond', price: 187000, weight: 3.8, quantity: 3, featured: false, description: 'Full-circle diamonds in platinum — a promise without end.', images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=80'] },
  { name: 'Aria Pendant', category: 'Necklaces', material: '18K Gold · Emerald', price: 156000, weight: 5.5, quantity: 2, featured: false, description: 'A single emerald suspended on a whisper-fine gold chain.', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80'] },
]

/** Ensure an admin exists and the catalogue has items (used on first run). */
export async function seedIfEmpty() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@aurelia.test').toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (!(await AdminUser.findOne({ email: adminEmail }))) {
    const admin = new AdminUser({ name: 'Store Admin', email: adminEmail, role: 'admin' })
    await admin.setPassword(adminPassword)
    await admin.save()
    console.log(`✔  Seeded admin user: ${adminEmail} / ${adminPassword}`)
  }

  if ((await Item.countDocuments()) === 0) {
    await Item.insertMany(SAMPLE_ITEMS)
    console.log(`✔  Seeded ${SAMPLE_ITEMS.length} sample items`)
  }
}

// Allow running standalone: `npm run seed`
const isMain = process.argv[1] && process.argv[1].endsWith('seed.js')
if (isMain) {
  try {
    await connectDB()
    await seedIfEmpty()
    console.log('Seeding complete.')
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  } finally {
    await disconnectDB()
    await mongoose.connection.close()
    process.exit()
  }
}
