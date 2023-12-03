const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const app = express()
app.use(express.json())
const cors = require("cors")
const { notesRouter } = require("./routes/notes.routes")
app.use(cors())
app.use("/users", userRouter)
app.use("/notes", notesRouter)

require('dotenv').config()
const PORT = process.env.PORT

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log(`server running in port ${PORT}`)
    }
    catch (err) {
        console.log(err)
    }
})