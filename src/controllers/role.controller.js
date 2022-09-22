const Role = new require('../models/role.model')

const get = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.getByName(name)

        res.statusCode = 200
        res.json({
            id: role.id
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const roles = await Role.getAll()

        res.statusCode = 200
        res.json(roles)
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const post = async (req = request, res = response) => {
    try {
        const role = await Role.upload(req.body)
        
        res.statusCode = 200
        res.json(role)
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.deletByName(name)

        res.statusCode = 200
        res.json({
            id: role.id,
            createdAt: role.createdAt
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.updateByName(name, req.body)

        res.statusCode = 200
        res.json({
            id: role.id,
            createdAt: role.createdAt
        })
    } catch (error) {
        res.statusCode = 500
        res.json({error})
    }
}

module.exports = {
    get,
    post,
    delet,
    put,
    getAll
}