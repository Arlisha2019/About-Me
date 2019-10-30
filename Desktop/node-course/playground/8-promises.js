// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Things went wrong')
//         resolve([ 3, 4, 5, 6])
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success', result)
// }).catch((error) => {
//     console.log('Error', error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2).then((sum) => {
//     add(sum, 5).then((sum2) => {
//         console.log(sum2)
//     }).catch((e) => {
//         console.log(e)
//     })
//     console.log(sum)
// }).catch((e) => {
//     console.log(e)
// })

add(8, 8).then((sum) => {
    console.log(sum)
    return add(sum, 5, 7)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})

