const {getToken, expiredToken} = require('../helpers/jwt')

module.exports = async (req = request, res = response, next) => {
    const token = req.header('Authorization')

    if(!token) return res.status(400).json({error: 'Unknow token'})

    if(await expiredToken(token)) return res.status(400).json({error: 'Token expired'})

    const user = await getToken(token)

    if(user.role !== 'ADMIN') return res.status(400).json({error: "Invalid authorization token"})

    next()
}