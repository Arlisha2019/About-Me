const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('This is my String', undefined)
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error) {
        return console.log(error)
    }

    console.log(result)
})