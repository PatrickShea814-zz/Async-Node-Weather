const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.forecast.io/forecast/c6e0b14c1e5188288aa7bdc55beeb5e0/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast servers.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getWeather = getWeather;