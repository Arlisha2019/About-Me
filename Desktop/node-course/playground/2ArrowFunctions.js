const tasks = {
    tasks: [{
        text: 'Grocery Shopping',
        completed: true
    }, {
        text: 'Clean Yard',
        completed: true
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo() {

        const taskToDo = this.tasks.filter((task) => {
            return task.completed  === false
        })
        return taskToDo
    }
}

console.log(tasks.getTasksToDo())