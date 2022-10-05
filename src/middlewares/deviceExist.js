const Device = require('../models/device.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {id} = req.params

        const deviceById = await Device.getById(id)
        if(!deviceById) return res.status(400).json({error: 'Incorrect device ID'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}