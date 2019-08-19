# Sweater Whether

An api for retrieving and favoriting forecast information based on given location input.

### Prerequisites

- Node.js
- Npm
- Express
- Sequelize

### Installing

- Clone Repo

```
npx sequelize db:create
npx sequelize db:migrate
npm install
npm start
```
## Production

https://stark-falls-16178.herokuapp.com/

## Built With

* [Node.js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [Express](https://expressjs.com/)
* [Sequelize](https://www.npmjs.com/package/sequelize)

## Endpoints

#### /api/v1/forecast?location=kansas city,mo
Body:
```json
{
  "api_key": "b1e1f345-b9c8-41de-86ec-7b8b60f037dc"
}
```
(8 Hourly & 8 Daily)

Response:

```json
{
    "location": "kansas city, mo",
    "currently": {
        "summary": "Humid and Mostly Cloudy",
        "icon": "partly-cloudy-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 78.83,
        "humidity": 0.84,
        "pressure": 1015.38,
        "windSpeed": 3.69,
        "windGust": 3.69,
        "windBearing": 117,
        "cloudCover": 0.66,
        "visibility": 10
    },
    "hourly": {
        "summary": "Humid and mostly cloudy throughout the day.",
        "icon": "partly-cloudy-day",
        "data": [
            {
                "time": 1566223200,
                "summary": "Humid and Mostly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 76.89,
                "humidity": 0.86,
                "pressure": 1015.31,
                "windSpeed": 3.12,
                "windGust": 3.12,
                "windBearing": 102,
                "cloudCover": 0.74,
                "visibility": 10
            },
            {
                "time": 1566226800,
                "summary": "Humid and Mostly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 80.41,
                "humidity": 0.82,
                "pressure": 1015.44,
                "windSpeed": 4.16,
                "windGust": 4.16,
                "windBearing": 124,
                "cloudCover": 0.6,
                "visibility": 10
            },
        ]
    },
    "daily": {
        "summary": "Rain on Wednesday through next Monday, with high temperatures falling to 75°F on Thursday.",
        "icon": "rain",
        "data": [
            {
                "time": 1566190800,
                "summary": "Humid and partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "sunriseTime": 1566214602,
                "sunsetTime": 1566263407,
                "precipIntensity": 0.0004,
                "precipIntensityMax": 0.0014,
                "precipIntensityMaxTime": 1566244800,
                "precipProbability": 0.1,
                "precipType": "rain",
                "temperatureHigh": 93.04,
                "temperatureLow": 77.94,
                "humidity": 0.79,
                "pressure": 1013.95,
                "windSpeed": 4.66,
                "windGust": 13.96,
                "cloudCover": 0.16,
                "visibility": 9.959,
                "temperatureMin": 72.59,
                "temperatureMax": 93.04
            },
            {
                "time": 1566277200,
                "summary": "Humid and partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "sunriseTime": 1566301057,
                "sunsetTime": 1566349724,
                "precipIntensity": 0.0017,
                "precipIntensityMax": 0.0061,
                "precipIntensityMaxTime": 1566302400,
                "precipProbability": 0.24,
                "precipType": "rain",
                "temperatureHigh": 95.97,
                "temperatureLow": 76.51,
                "humidity": 0.73,
                "pressure": 1014.1,
                "windSpeed": 9.03,
                "windGust": 30.81,
                "cloudCover": 0.27,
                "visibility": 10,
                "temperatureMin": 77.94,
                "temperatureMax": 95.97
            },
        ]
    }
}
```
