const User = require('../models/user.model')

module.exports = async (req = request, res = response, next) => {
    const {username, email} = req.body

    const userByEmail = await User.getByEmail(email)
    if(userByEmail) return res.status(406).json({error: "Email already exist"})

    const userByUsername = await User.getByUsername(username)
    if(userByUsername) return res.status(406).json({error: "Username already exist"})

    next()
}