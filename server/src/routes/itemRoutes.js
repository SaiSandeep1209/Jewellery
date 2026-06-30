import { Router } from 'express'
import {
  listItems,
  listCategories,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js'
import { protect, adminOnly } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

// Public
router.get('/', asyncHandler(listItems))
router.get('/categories', asyncHandler(listCategories))
router.get('/:id', asyncHandler(getItem))

// Admin
router.post('/', protect, adminOnly, asyncHandler(createItem))
router.put('/:id', protect, adminOnly, asyncHandler(updateItem))
router.delete('/:id', protect, adminOnly, asyncHandler(deleteItem))

export default router
