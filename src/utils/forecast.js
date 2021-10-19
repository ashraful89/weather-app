const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1dcc9de389756f8a834acce3dc730da9&query='+ lon +','+ lat +'&units=m'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect with weather server!')
        } else if (body.error) {
            callback('Address not found!')
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                location: body.location.name + ',' + body.location.country,
            })
        }
    })
}

module.exports = forecast