import mongoose from 'mongoose'

let memoryServer = null

/**
 * Connect to MongoDB. If MONGO_URI is not provided, spin up an in-memory
 * MongoDB so the project runs with zero external setup during development.
 */
export async function connectDB() {
  let uri = process.env.MONGO_URI

  if (!uri) {
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    memoryServer = await MongoMemoryServer.create()
    uri = memoryServer.getUri('djewellry')
    console.log('ℹ  No MONGO_URI set — started an in-memory MongoDB for development.')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log(`✔  MongoDB connected (${mongoose.connection.host})`)

  return { usingMemory: Boolean(memoryServer) }
}

export async function disconnectDB() {
  await mongoose.disconnect()
  if (memoryServer) await memoryServer.stop()
}
