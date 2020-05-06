const weather = require('./utils/weatherData')
const Case = require('case')
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const templateDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', templateDirectory)
hbs.registerPartials(partialsDirectory)

//Setup directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aman Thakur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Aman Thakur',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aman Thakur'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city || !req.query.country) {
        return res.send({
            error: 'Please provide city and country'
        })
    }

    weather.getWeather(Case.capital(req.query.city), (req.query.country).toUpperCase(), (error, temperature, condition, city) => {
        if (error) return res.send({
            error
        })
        res.send({
            temperature,
            condition,
            city
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorType: 'Help Article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorType: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port', port)
})