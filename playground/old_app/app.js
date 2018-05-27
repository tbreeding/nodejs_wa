const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        forecast.getForecast(results.lat,results.lng, (errMsg, res) => {
            if(errMsg) {
                console.log(errMsg);
            } else {
                console.log(`The weather is currently ${res.currSummary} at a temp of ${res.currTemp}.`);
            }
        })
    }
});

