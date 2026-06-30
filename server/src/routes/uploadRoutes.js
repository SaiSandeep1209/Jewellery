import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = Router()

/** Admin: upload one image, returns its public path. */
router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' })
  res.status(201).json({ url: `/uploads/${req.file.filename}` })
})

export default router
