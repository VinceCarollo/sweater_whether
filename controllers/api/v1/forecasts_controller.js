var User = require('../../../models').User;
var https = require('https');

var forecastIndex = function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    let lat = '';
    let lng = '';
    if (user) {
      https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=denver,co&key=${process.env.GOOGLE_API_KEY}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          lat = JSON.parse(data).results[0].geometry.location.lat
          lng = JSON.parse(data).results[0].geometry.location.lng
          console.log(lat)
          console.log(lng)
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
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
