const express = require("express")
const { NotesModel } = require("../model/notes.model")
const { auth } = require("../middlewares/auth.middleware")
const notesRouter = express()
notesRouter.use(auth)
notesRouter.post("/create", async (req, res) => {
    // const { title, body } = req.body
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "note added successfully", note: note })
    }
    catch {
        res.status(400).send({ "err": err.message })
    }
})
notesRouter.get("/get", async (req, res) => {
    const { userName } = req.body
    try {
        const notes = await NotesModel.find({ userName })
        res.send(notes)
    }
    catch {
        res.status(400).send({ "err": err.message })
    }
})
notesRouter.patch("/update/:note_id", async (req, res) => {
    const { note_id } = req.params
    const note = await NotesModel.findOne({ _id: note_id })
    try {
        if (req.body.userID === note.userID) {
            await NotesModel.findByIdAndUpdate({ _id: note_id }, req.body)
            res.send(req.body)
        }
        else {
            res.send("not authorised")
        }
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})
notesRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    const note = await NotesModel.findOne({ _id: id })

    try {

        if (req.body.userID === note.userID) {
            await NotesModel.findByIdAndDelete({ _id: id })
            res.send("deleted successfully")
        }
        else {
            res.send("not authorised")
        }
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})

module.exports = { notesRouter }