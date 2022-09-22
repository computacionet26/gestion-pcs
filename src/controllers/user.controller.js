const User = new require('../models/user.model')
const {expiredToken, genToken, getToken} = require('../utils/jwt')

const register = async (req = request, res = response) => {
    try {
        const {username, email, password} = req.body

        const user = await User.register({username, email, password})

        res.statusCode = 200
        res.json(user)
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const login = async (req = request, res = response) => {
    try {
        const user = await User.login(req.body)

        const token = await genToken({id: user.id, name: user.username}, '360d')
       
        res.statusCode = 200
        res.json({token})
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const getById = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const user = await User.getById(id)

        res.statusCode = 200
        res.json({
            username: user.username,
            createdAt: user.createdAt,
            email: user.email
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const get = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.getByUsername(username)

        res.statusCode = 200
        res.json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const users = await User.getAll()

        res.statusCode = 200
        res.json(users)
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.deletByUsername(username)

        res.statusCode = 200
        res.json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {username} = req.params
        const user = await User.updateByUsername(username, req.body)

        res.statusCode = 200
        res.json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

module.exports = {
    login,
    register,
    get,
    delet,
    put,
    getAll
}