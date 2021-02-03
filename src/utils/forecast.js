const request = require('request')

const forecast = (lat, long, callback) => {
  const key = 'fd78f02b210d049f7680e8087b7d72e0'
  const url = `http://api.weatherstack.com/current?access_key=fd78f02b210d049f7680e8087b7d72e0&query=${lat,long}`

  request({ url, json: true }, (e, { body }) => {
    if (e) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.e) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        feelsLike: body.current.feelslike,
        cast: body.current.weather_descriptions
      })
    }
  })
}

module.exports = forecast