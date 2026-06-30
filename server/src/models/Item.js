import mongoose from 'mongoose'

/** A jewellery item shown in the catalogue and managed from the admin page. */
const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // e.g. Rings, Necklaces
    material: { type: String, trim: true, default: '' }, // e.g. 22K Gold, Diamond
    description: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 }, // INR
    weight: { type: Number, min: 0, default: 0 }, // grams
    quantity: { type: Number, required: true, min: 0, default: 0 }, // units in store
    images: { type: [String], default: [] }, // /uploads/x.jpg or absolute URLs
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

itemSchema.index({ name: 'text', description: 'text', category: 'text', material: 'text' })

export default mongoose.model('Item', itemSchema)
