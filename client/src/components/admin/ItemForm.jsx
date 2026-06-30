import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { itemsApi, uploadApi } from '../../services/api'
import { mediaUrl } from '../../lib/format'

const CATEGORY_SUGGESTIONS = ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bracelets', 'Pendants', 'Chains']

const empty = { name: '', category: '', material: '', description: '', price: '', weight: '', quantity: '', featured: false }

/** Create or edit an item. Pass `item` to edit; omit to create. */
export default function ItemForm({ item, onSaved, onCancel }) {
  const editing = Boolean(item)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: empty })
  const [image, setImage] = useState('') // current image path/url
  const [uploading, setUploading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (item) {
      reset({
        name: item.name, category: item.category, material: item.material || '',
        description: item.description || '', price: item.price, weight: item.weight ?? '',
        quantity: item.quantity, featured: item.featured,
      })
      setImage(item.images?.[0] || '')
    } else {
      reset(empty)
      setImage('')
    }
  }, [item, reset])

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setServerError('')
    try {
      const { url } = await uploadApi.image(file)
      setImage(url)
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (values) => {
    setServerError('')
    const payload = {
      ...values,
      price: Number(values.price),
      weight: values.weight === '' ? 0 : Number(values.weight),
      quantity: Number(values.quantity),
      images: image ? [image] : [],
    }
    try {
      const saved = editing ? await itemsApi.update(item._id, payload) : await itemsApi.create(payload)
      onSaved(saved)
      if (!editing) { reset(empty); setImage('') }
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Could not save item')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line bg-white p-6 shadow-soft" noValidate>
      <h3 className="font-serif text-2xl text-ink">{editing ? 'Edit item' : 'Add a new item'}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Name</label>
          <input className="field" {...register('name', { required: 'Required' })} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Category</label>
          <input className="field" list="cat-suggestions" placeholder="Rings" {...register('category', { required: 'Required' })} />
          <datalist id="cat-suggestions">
            {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
          </datalist>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>}
        </div>

        <div>
          <label className="label">Material (optional)</label>
          <input className="field" placeholder="22K Gold · Diamond" {...register('material')} />
        </div>

        <div>
          <label className="label">Price (₹)</label>
          <input type="number" min="0" className="field" {...register('price', { required: 'Required', min: { value: 0, message: '≥ 0' } })} />
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>}
        </div>

        <div>
          <label className="label">Weight (grams)</label>
          <input type="number" min="0" step="0.01" className="field" placeholder="e.g. 12.5" {...register('weight', { min: { value: 0, message: '≥ 0' } })} />
          {errors.weight && <p className="mt-1 text-xs text-red-600">{errors.weight.message}</p>}
        </div>

        <div>
          <label className="label">Quantity in store</label>
          <input type="number" min="0" className="field" {...register('quantity', { required: 'Required', min: { value: 0, message: '≥ 0' } })} />
          {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="label">Description (optional)</label>
          <textarea rows={3} className="field resize-none" {...register('description')} />
        </div>

        <div className="sm:col-span-2">
          <label className="label">Image</label>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-sand">
              {image ? <img src={mediaUrl(image)} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-stone">none</span>}
            </div>
            <div>
              <input type="file" accept="image/*" onChange={onUpload} className="text-sm text-stone file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-ivory hover:file:bg-gold-deep" />
              {uploading && <p className="mt-1 text-xs text-stone">Uploading…</p>}
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" {...register('featured')} className="h-4 w-4 accent-gold" />
          <span className="text-sm text-ink">Show in “Featured” on the home page</span>
        </label>
      </div>

      {serverError && <p className="mt-4 text-sm text-red-600">{serverError}</p>}

      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={isSubmitting || uploading} className="btn-primary disabled:opacity-60">
          {isSubmitting ? 'Saving…' : editing ? 'Save changes' : 'Add item'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>}
      </div>
    </form>
  )
}
