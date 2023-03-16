const User = require('../models/user.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {username} = req.params
        //console.log(username);

        const userByUsername = await User.getByUsername(username)
        if(!userByUsername) return res.status(400).json({error: 'Incorrect username'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}