require('../src/db/mongoose')

const Task = require('../src/models/task')



// Task.findByIdAndDelete('5da3e826e538c869b1805aa7').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (_id) => {
    const task = await Task.findByIdAndDelete(_id)
    const count = await Task.countDocuments({ completed: false })

    return count
   
}

deleteTaskAndCount('5da4844a9abbf8bf4f141f44').then((task) => {
    console.log(task, 'Result')
}).catch((e) => {
    console.log(e, 'Error')
})