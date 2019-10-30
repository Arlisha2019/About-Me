

setTimeout(() => {
    console.log('Two Seconds are up!')
}, 2000)


const names = [ 'Bob', 'Mary', 'Dan'];

const shortNames = names.filter((name) => {
    return name.length <=4 
})


// const geocode = (address, callback) => {
//    setTimeout(() => {

//     const data = {
//         latitude: 0,
//         langtitude: 0
//     }

//     callback(data)
//    }, 3000)
// }
// geocode('Dallas', (data) => {
//     console.log(data)
// })

const add = (num1, num2, callback) => {

    setTimeout(() => {
        const sum = num1 + num2;
        callback(sum)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum)
})
