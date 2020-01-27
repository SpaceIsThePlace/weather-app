const request = require('request');
const keys = require('./keys');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + encodeURIComponent(keys.forecast) + '/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';
    
    request({ url, json: true}, (error, {body} ) => {
        if(error) {
            callback("Unable to connect to weather service", undefined)
        } else if(body.error) {
            callback("Cannot find this location, try again!", undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out (with an apparent temperature of ${body.currently.apparentTemperature}). Humidity is ${body.currently.humidity}%, and there is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
};

module.exports = forecast;