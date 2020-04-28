const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const PORT = config.get('port') || 5000

const app = express()
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/link', require('./routes/link'))
app.use('/t', require('./routes/redirect'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`App has been started. Click http://localhost:${PORT}`))
  } catch(e) {
    console.warn('Server error', e.message)
    process.exit(1)
  }
}

start()



