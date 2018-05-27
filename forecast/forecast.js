const request = require('request');

const getForecast = (lat, lng, callback) => {
    console.log(lat, lng);
    request({
        url: `https://api.darksky.net/forecast/9ef8170b7563e0d780ca42362db0a6de/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Dark Sky servers.');
        } else if(body.code) {
           callback(`${body.code} - ${body.error}`);
        } else if (response.statusCode === 200) {
            callback(undefined, {
                currSummary: body.currently.summary,
                currTemp: body.currently.temperature
            });
        }
    });
};

module.exports = {
    getForecast
}

