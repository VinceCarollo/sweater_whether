var User = require('../../../models').User;
var googleService = require('../../../services/google_service.js')
var fetch = require('node-fetch');

var forecastIndex = function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      let location = googleService.location(req.query.location)
      location.then(data => {
        let lat = data.results[0].geometry.location.lat
        let lng = data.results[0].geometry.location.lng
        fetch(`https://api.darksky.net/forecast/1b6460a7498ac4cf844e0973f91d9184/${lat},${lng}`)
          .then(res => res.json())
          .then(data => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send({
              location: req.query.location,
              currently: {
                summary: data.currently.summary,
                icon: data.currently.icon,
                precipIntensity: data.currently.precipIntensity,
                precipProbability: data.currently.precipProbability,
                temperature: data.currently.temperature,
                humidity: data.currently.humidity,
                pressure: data.currently.pressure,
                windSpeed: data.currently.windSpeed,
                windGust: data.currently.windGust,
                windBearing: data.currently.windBearing,
                cloudCover: data.currently.cloudCover,
                visibility: data.currently.visibility,
              }
            })
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({ error })
          })
      })
      //Faraday.get("https://api.darksky.net/forecast/#{ENV['DARKSKY_API_KEY']}/#{lat},#{lng}")
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send({ error: 'Not Authorized' })
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error })
  })
}
 module.exports = {
   index: forecastIndex
 }
