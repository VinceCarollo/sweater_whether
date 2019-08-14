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
        fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`)
          .then(res => res.json())
          .then(data => {
            let hourly = data.hourly.data.slice(0, 9).map((hour) => {
              delete hour.apparentTemperature;
              delete hour.dewPoint;
              delete hour.uvIndex;
              delete hour.ozone;
              return hour
            })
            let daily = data.daily.data.slice(0, 9).map((day) => {
              delete day.moonPhase;
              delete day.temperatureHighTime;
              delete day.temperatureLowTime;
              delete day.apparentTemperatureHigh;
              delete day.apparentTemperatureHighTime;
              delete day.apparentTemperatureLow;
              delete day.apparentTemperatureLowTime;
              delete day.dewPoint;
              delete day.windGustTime;
              delete day.windBearing;
              delete day.uvIndex;
              delete day.uvIndexTime;
              delete day.ozone;
              delete day.temperatureMinTime;
              delete day.temperatureMaxTime;
              delete day.apparentTemperatureMin;
              delete day.apparentTemperatureMinTime;
              delete day.apparentTemperatureMax;
              delete day.apparentTemperatureMaxTime;
              return day
            })
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
              },
              hourly: {
                summary: data.hourly.summary,
                icon: data.hourly.icon,
                data: hourly
              },
              daily: {
                summary: data.daily.summary,
                icon: data.daily.icon,
                data: daily
              }
            })
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(500).send({ error })
          })
      })
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
