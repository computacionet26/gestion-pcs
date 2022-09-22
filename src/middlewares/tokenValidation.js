const User = require('../models/user.model')
const {getToken, expiredToken} = require('../utils/jwt')

module.exports = async (req = request, res = response, next) => {
    const token = req.header('Authorization')

    if(!token) return res.status(400).json({error: 'Unknow token'})

    if(await expiredToken(token)) return res.status(400).json({error: 'Token expired'})

    const {username} = req.params
    const {id, role} = await getToken(token)

    const user = await User.getByUsername(username)

    if(role !== 'ADMIN' && user.id !== id) return res.status(400).json({error: "Invalid authorization token"})

    next()
}

// const User = require('../models/user.model')
// const {genToken, getToken, expiredToken} = require('../helpers/jwt')

// module.exports = async (req = request, res = response, next) => {
//     const token = req.header('Authorization')

//     if(await expiredToken(token)) return res.status(400).json({error: 'Token expired - tokenMiddlewareStorage'})

//     if(!token) return res.status(401).json({error: 'Unknow token.'})

//     req.body.authorId = getToken(token).id
//     req.body.author = getToken(token).name

//     next()
// }