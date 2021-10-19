const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { hasSubscribers } = require('diagnostics_channel')
const { response } = require('express')
const app = express()

// defines path
const publicdir = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templete/views')
const partialPath = path.join(__dirname, '../templete/templetes')

// set custom path
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Ashraful'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        res.send({
            error: 'Request not found!'
        })
    }

    geocode(address, (error, {latitude, longitude}) => {
        if (error) {
            res.send({
                error: 'Address not found!'
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                res.send({
                    error: 'Weather Data not found!'
                })
            }
            res.send({
                Data: 'weather data',
                address: address,
                Forecast: forecastdata
            })
        })
    
    })
})

app.get('*', (req, res) => {
 res.send('Page not found! 404!')
})

// fetch('http://localhost:3000/weather?address=tangail').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console,log(data.error)
//         } else {
//             console.log(data)
//         }
//     })
// })

app.listen(3000, () => {
    console.log('Server will run in 3000 port')
})