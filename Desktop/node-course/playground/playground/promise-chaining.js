require('../src/db/mongoose')

const User = require('../src/models/user')

// 5da3f6c956364981d239f8ae

User.findByIdAndUpdate('5da480cd3db7f3b98d76d83d', { age: 15 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 15 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})