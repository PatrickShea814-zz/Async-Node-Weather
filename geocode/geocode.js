const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=qKY0CJfySFMol0itu4H6t0vUYVS5GlYx&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the MapQuest servers.')
        } else {
            var forAddress = body.results[0].locations[0].street;
            var forCity = body.results[0].locations[0].adminArea5;
            var forState = body.results[0].locations[0].adminArea3;
            var forZip = body.results[0].locations[0].postalCode;
            var forCountry = body.results[0].locations[0].adminArea1;
            var formattedAddress = forAddress + ' ' + forCity + ' ' + forState + ' ' + forZip + ' ' + forCountry;
            callback(undefined, {
                address: formattedAddress,
                latitude: body.results[0].locations[0].displayLatLng.lat,
                longitude: body.results[0].locations[0].displayLatLng.lng
            });
        };
    });
}

module.exports.geocodeAddress = geocodeAddress;
