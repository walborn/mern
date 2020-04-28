const { Router } = require('express')
const shortId = require('shortid')
const router = Router()
const auth = require('../middleware/auth')
const Link = require('../models/Link')
const config = require('config')


// api/auth/register
router.post(
  '/generate',
  auth,
  async (req, res) => {
    try {
      const baseUrl = config.get('baseUrl')
      const { from } = req.body
      const existing = await Link.findOne({ from })
      if (existing) return res.json({ link: existing })

      const code = shortId.generate()
      const to = baseUrl + '/t/' + code

      const link = new Link({ code, to, from, owner: req.user.userId })
      await link.save()
      return res.status(201).json({ link })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)
// api/link
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const links = await Link.find({ owner: req.user.userId })
      res.json(links)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)

router.get(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const link = await Link.findById(req.params.id)
      res.json(link)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)

module.exports = router