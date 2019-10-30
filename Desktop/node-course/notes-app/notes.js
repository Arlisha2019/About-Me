const fs = require('fs');

const addNote = function (title, body) {

}

const loadNotes = function() {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes

}