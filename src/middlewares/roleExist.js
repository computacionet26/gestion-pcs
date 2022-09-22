const Role = require('../models/role.model')

module.exports = async (req = request, res = response, next) => {
    const {name} = req.params

    const roleByName = await User.getByName(name)
    if(!roleByName) return res.status(400).json({error: 'Incorrect role name'})

    next()
}