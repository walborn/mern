const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')

router.get(
  '/:code',
  async (req, res) => {
    try {
      const link = await Link.findOne({ code: req.params.code })
      if (!link) return res.status(404).json({ message: 'Link is not found'})
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Try again.'})
    }
  }
)

module.exports = router