const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const axios = require('axios');
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
    
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=
            ${encodeURIComponent(argv.address)}
            &key=AIzaSyANui0q7cBIT_oU03ipRH3OkVEzaendoI0`;

    axios.get(geocodeURL).then((res) => {
        if(res.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }
        
        const lat = res.data.results[0].geometry.location.lat;
        const lng = res.data.results[0].geometry.location.lng;
        const weatherURL = `https://api.darksky.net/forecast/9ef8170b7563e0d780ca42362db0a6de/${lat},${lng}`;

        console.log(res.data.results[0].formatted_address);

        return axios.get(weatherURL);
        
    }).then((res) => {
        const summary = res.data.currently.summary;
        const temp = res.data.currently.temperature;

        console.log(`The weather is currently ${summary} at a temp of ${temp}.`);
    })
    .catch((e) => {
        if(e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    })