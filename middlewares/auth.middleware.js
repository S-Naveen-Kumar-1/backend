var jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        jwt.verify(token, "masai", (err, decoded) => {
            if (decoded) {
                req.body.userName = decoded.userName,
                    req.body.userID = decoded.userID
                next()
            }
            else {
                res.send("youre not authorised")
            }

        })
    }
    else {
        res.send('please login')
    }
}

module.exports = { auth }