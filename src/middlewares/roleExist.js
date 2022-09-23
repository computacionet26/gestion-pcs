const Role = require('../models/role.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {name} = req.params

        const roleByName = await Role.getByName(name)
        if(!roleByName) return res.status(400).json({error: 'Incorrect role name'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}