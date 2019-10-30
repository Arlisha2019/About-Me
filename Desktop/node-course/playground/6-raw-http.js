const https = require('https')


const url = 'https://api.darksky.net/forecast/b33fabf763431691bc5f3b98a7c7c2e5/40,-70'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
       data = data + chunk.toString()
        
    })

    response.on('end', (chunk) => {

        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An Error', error)
})

request.end()