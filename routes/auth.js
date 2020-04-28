const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require('../models/User')

// api/auth/register
router.post(
  '/register',
  [
    check('email', 'wrong email').isEmail(),
    check('password', 'password has to be longer than 6 symbols') 
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400)
      .json({ errors: errors.array(), message: 'Wrong registration data' })
    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) return res.status(400).json({ message: 'Such user is already exist'})
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'New user created' })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)
// api/auth/login
router.post(
  '/login',  [
    check('email', 'input correct email').normalizeEmail().isEmail(),
    check('password', 'password have to be longer than 6 symbols').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(400)
      .json({ errors: errors.array(), message: 'Wrong credentials' })
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: 'Such user is not exist'})

      const isMatch = bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: 'Wrong password' })

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })

      res.status(200).json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)

module.exports = router