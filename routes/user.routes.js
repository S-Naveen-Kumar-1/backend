
const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const userRouter = express()
var jwt = require('jsonwebtoken');

userRouter.post("/register", (req, res) => {
    const { email, password, userName } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "msg": "err in hashing" })
            }
            else {
                const user = new UserModel({
                    email,
                    userName,
                    password: hash,
                })
                await user.save()
                res.status(200).send({ "msg": "User registration success", "user": user })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        console.log("user", user)
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ userName: user.userName, userID: user._id }, "masai")
                res.status(200).send({ "msg": "Login Success", "token": token })
            }
            else {
                res.status(200).send({ "msg": "Invalid credentials" })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})
module.exports = { userRouter }