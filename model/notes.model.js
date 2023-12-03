const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title: String,
    body: String,
    userName: String,
    userID: String
},
    { versionKey: false }
)

const NotesModel = mongoose.model("note", notesSchema)
module.exports = { NotesModel }