const User = new require('../models/user.model')
const Role = new require('../models/role.model')
const UserRole = new require('../models/userRole.model')
const {expiredToken, genToken, getToken} = require('../utils/jwt')

const register = async (req = request, res = response) => {
    try {
        const {username, email, password, roles} = req.body

        const user = await User.register({username, email, password})

        const role = await Role.getByName(roles)

        await UserRole.upload({
            userId: user.id,
            roleId: role.id
        })

        res.status(200).json({...user, role: role.name})
    } catch (error) {
        res.status(500).json({error})
    }
}

const login = async (req = request, res = response) => {
    try {
        const user = await User.login(req.body)

        const token = await genToken({id: user.id, name: user.username}, '360d')
       
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getById = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const user = await User.getById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const get = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.getByUsername(username)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const users = await User.getAll()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.deletByUsername(username)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {username} = req.params
        const user = await User.updateByUsername(username, req.body)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    login,
    register,
    get,
    delet,
    put,
    getAll,
    getById
}