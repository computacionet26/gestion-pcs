const Role = new require('../models/role.model')

const get = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.getByName(name)

        res.status(200).json({
            id: role.id,
            createdAt: role.createdAt,
            name: role.name
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const roles = await Role.getAll()

        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({error})
    }
}

const post = async (req = request, res = response) => {
    console.log(req.body);
    try {
        const role = await Role.upload(req.body)
        
        res.status(200).json(role)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.deletByName(name)

        res.status(200).json({
            id: role.id,
            createdAt: role.createdAt,
            name: role.name
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const role = await Role.updateByName(name, req.body)

        res.status(200).json({
            id: role.id,
            createdAt: role.createdAt,
            name: role.name
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAll,
    get,
    post,
    delet,
    put
}