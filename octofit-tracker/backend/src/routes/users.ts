import { Router } from 'express'
import { User } from '../models/User'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await User.find().limit(50)
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body
    const user = new User({ username, email })
    await user.save()
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router
