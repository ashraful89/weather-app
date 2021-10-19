const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYXNocmFmdWw4OSIsImEiOiJja3VwYnlrMnIybzNlMnhteDN6cGVtMnltIn0.lRQfVBhuIzSj73oZE6Hh8g'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect with geo server!')
        } else if (body.message) {
            callback('Address not found!')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode