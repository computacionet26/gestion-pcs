const User = require('../models/user.model')

module.exports = async (req = request, res = response, next) => {
    try {
        if(req.body.username.includes('@')) {
            req.body.email = req.body.username
            delete req.body.username
        }

        const {username, email} = req.body

        if(username){
            const userByUsername = await User.getByUsername(username)
            if(userByUsername) return next()
        }

        if(email){
            const userByEmail = await User.getByEmail(email)
            if(userByEmail) return next()
        }

        return res.status(400).json({error: 'Incorrect name, email or password'})
    } catch (error) {
        return res.status(500).json({error})
    }
}