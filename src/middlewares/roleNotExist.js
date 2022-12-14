const Role = require('../models/role.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {name} = req.body

        const roleByName = await Role.getByName(name)
        if(roleByName) return res.status(400).json({error: 'Role name already exist'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}