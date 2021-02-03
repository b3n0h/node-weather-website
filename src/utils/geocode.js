const request = require('request')

const geocode = (address, callback) => {
  const geoKey = 'pk.eyJ1IjoidHIxZ2dzIiwiYSI6ImNram0xOHBvczBmamEyc3FuZzh5YzFycWwifQ.D_6Kr14dEs0TaEaan8K39g'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=${geoKey}&limit=1`

  request({ url, json: true }, (e, { body }) => {
    if (e) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode