const User = new require('../models/user.model')
const {getToken, expiredToken} = require('../utils/jwt')

module.exports = async (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization')

        if(!token) return res.status(400).json({error: 'Unknow token'})

        if(await expiredToken(token)) return res.status(400).json({error: 'Token expired'})

        const user = await getToken(token)

        const userById = await User.getById(user.id)

        if(!userById) return res.status(400).json({ref: "check_user", error: "Invalid authorization token"})

        next()
    } catch (error) {
        return res.status(500).json({error})
    }
    
}