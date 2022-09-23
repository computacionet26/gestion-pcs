const bcrypt = require('bcryptjs')

module.exports = async (req = request, res = response, next) => {
    try {
        const {password} = req.body

        if(password) req.body.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}