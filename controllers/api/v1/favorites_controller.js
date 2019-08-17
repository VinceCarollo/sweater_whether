var User = require('../../../models').User;
var Location = require('../../../models').Location;
var fetch = require('node-fetch');
var googleService = require('../../../services/google_service.js')

var createLocation = function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      user.createLocation({
        name: req.body.location
      })
      .then(location => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send({ message: `${location.name} has been added to your favorites` })
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error })
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

var allLocations = async function(req, res, next) {
  let user = await User.findOne({
    where: {
      api_key: req.body.api_key
    },
    include: [{
      model: Location,
      as: 'locations'
    }]
  })
  if (user) {
    forecasts = [];
    user.locations.forEach(location => {
      let locationData = googleService.location(location.dataValues.name)
      locationData.then(data => async () => {
        let lat = data.results[0].geometry.location.lat
        let lng = data.results[0].geometry.location.lng
        await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`)
          .then(res => res.json())
          .then(data => {
            return {
              location: location.dataValues.name,
              current_wheather: {
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
            }
          })
      })
    })
    res.send('will fix later');
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send({ error: 'Not Authorized' })
  }
}

module.exports = {
  create: createLocation,
  index: allLocations
}
