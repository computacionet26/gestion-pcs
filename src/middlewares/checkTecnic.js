const Role = new require('../models/role.model')
const UserRole = new require('../models/userRole.model')
const {getToken, expiredToken} = require('../utils/jwt')

module.exports = async (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization')

        if(!token) return res.status(400).json({error: 'Unknow token'})

        if(await expiredToken(token)) return res.status(400).json({error: 'Token expired'})

        const user = await getToken(token)

        const userRoles = await UserRole.getByUserId(user.id)

        userRoles.forEach(async (element, index) => {
            const role = await Role.getById(element.roleId)

            if(role.name === 'ADMIN') return next()
            else if(role.name === 'TECNIC') return next()
            else if(index+1 === userRoles.length) return res.status(400).json({error: "Invalid authorization token"})
        })
    } catch (error) {
        return res.status(500).json({error})
    }
    
}