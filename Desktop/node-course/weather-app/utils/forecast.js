


const request = require('request')


const forecast = ( latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/b33fabf763431691bc5f3b98a7c7c2e5/' + latitude + ',' + longitude

    request({ url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to Connect to Services Services', undefined)
        } else if(body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, 
               body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain.' 
            )
        }
    })
}

module.exports = forecast