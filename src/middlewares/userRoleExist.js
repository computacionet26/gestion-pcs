const UserRole = require('../models/userRole.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {id} = req.params

        const userRoleById = await UserRole.getById(id)
        if(!userRoleById) return res.status(400).json({error: 'Incorrect user role id'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}