const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ben Oh'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ben Oh'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help me',
    title: 'Help',
    name: 'Ben Oh'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  }

  geocode(req.query.address, (e, { lat, long, location } = {}) => {
    if (e) {
      return res.send({e})
    }

    forecast(long, lat, (e, forecastD) => {
      if (e) {
        return res.send({e})
      }

      res.send({
        forecast: forecastD,
        location,
        address: req.query.address
      })
    }) 
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Ben Oh'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Ben Oh'
  })
})

app.listen(3000, () => {
  console.log('Server is up on 3000')
})