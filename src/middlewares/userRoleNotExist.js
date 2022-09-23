const UserRole = require('../models/userrole.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {id} = req.params

        const userRoleById = await User.getById(id)
        if(userRoleById) return res.status(400).json({error: 'User role id already exist'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}