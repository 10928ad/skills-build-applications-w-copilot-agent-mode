import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'

const app = express()
const PORT = Number(process.env.PORT) || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/users', usersRouter)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`)
      console.log(`Connected to MongoDB at ${MONGO_URI}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
