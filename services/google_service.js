var fetch = require('node-fetch');

let locationData = function(locationInput) {
  return new Promise((resolve, reject) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationInput}&key=${process.env.GOOGLE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
    });
  }

module.exports = {
  location: locationData
}
