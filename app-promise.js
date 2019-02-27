
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: 'Address to find weather for:',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=qKY0CJfySFMol0itu4H6t0vUYVS5GlYx&location=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
    var forAddress = response.data.results[0].locations[0].street;
    var forCity = response.data.results[0].locations[0].adminArea5;
    var forState = response.data.results[0].locations[0].adminArea3;
    var forZip = response.data.results[0].locations[0].postalCode;
    var forCountry = response.data.results[0].locations[0].adminArea1;
    var formattedAddress = forAddress + ' ' + forCity + ' ' + forState + ' ' + forZip + ' ' + forCountry;
    var lat = response.data.results[0].locations[0].displayLatLng.lat;
    var long = response.data.results[0].locations[0].displayLatLng.lng;
    var weatherURL = `https://api.forecast.io/forecast/c6e0b14c1e5188288aa7bdc55beeb5e0/${lat},${long}`;
    console.log(formattedAddress);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log('Unable to find address.');
    }
});