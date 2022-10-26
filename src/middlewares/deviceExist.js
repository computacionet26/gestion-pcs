const Device = require('../models/device.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {id} = req.params

        const deviceById = await Device.getById(parseInt(id))
        if(!deviceById) return res.status(400).json({error: 'Incorrect device ID'})
    
        next()
    } catch (error) {
        console.log({ref: 'device_exist', error});
        return res.status(500).json({ref: "device_exist", error})
    }
}