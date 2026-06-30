import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { connectDB } from './config/db.js'
import { seedIfEmpty } from './utils/seed.js'
import { notFound, errorHandler } from './middleware/error.js'
import authRoutes from './routes/authRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { UPLOAD_DIR } from './middleware/upload.js'

async function start() {
  await connectDB()
  await seedIfEmpty() // ensures an admin + sample items exist on first run

  const app = express()

  app.use(
    cors({
      origin: (process.env.CLIENT_ORIGIN || '').split(',').filter(Boolean).length
        ? process.env.CLIENT_ORIGIN.split(',')
        : true, // allow all in dev
    }),
  )
  app.use(express.json())
  app.use(morgan('dev'))

  // Serve uploaded item images
  app.use('/uploads', express.static(UPLOAD_DIR))

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  app.use('/api/auth', authRoutes)
  app.use('/api/items', itemRoutes)
  app.use('/api/upload', uploadRoutes)

  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`✔  API listening on http://localhost:${PORT}`))
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
