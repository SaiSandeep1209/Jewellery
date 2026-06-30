import Item from '../models/Item.js'

/** Public: list items with optional ?category, ?search, ?featured. */
export async function listItems(req, res) {
  const { category, search, featured } = req.query
  const filter = {}
  if (category && category !== 'All') filter.category = category
  if (featured === 'true') filter.featured = true
  if (search) filter.$text = { $search: search }

  const items = await Item.find(filter).sort({ createdAt: -1 })
  res.json(items)
}

/** Public: distinct category list (for filter bar). */
export async function listCategories(_req, res) {
  const categories = await Item.distinct('category')
  res.json(categories.sort())
}

export async function getItem(req, res) {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  res.json(item)
}

function pickFields(body) {
  const { name, category, material, description, price, weight, quantity, images, featured } = body
  const out = {}
  if (name !== undefined) out.name = name
  if (category !== undefined) out.category = category
  if (material !== undefined) out.material = material
  if (description !== undefined) out.description = description
  if (price !== undefined) out.price = Number(price)
  if (weight !== undefined) out.weight = Number(weight)
  if (quantity !== undefined) out.quantity = Number(quantity)
  if (images !== undefined) out.images = Array.isArray(images) ? images : [images].filter(Boolean)
  if (featured !== undefined) out.featured = Boolean(featured)
  return out
}

/** Admin: create an item. */
export async function createItem(req, res) {
  const data = pickFields(req.body)
  if (!data.name || !data.category || data.price == null) {
    res.status(400)
    throw new Error('Name, category and price are required')
  }
  const item = await Item.create(data)
  res.status(201).json(item)
}

/** Admin: update an item (price, quantity, etc.). */
export async function updateItem(req, res) {
  const item = await Item.findByIdAndUpdate(req.params.id, pickFields(req.body), {
    new: true,
    runValidators: true,
  })
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  res.json(item)
}

/** Admin: delete an item. */
export async function deleteItem(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  res.json({ message: 'Item deleted', id: req.params.id })
}
