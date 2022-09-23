const Lab = require('../models/lab.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {name} = req.params

        const labByName = await Lab.getByName(name)
        if(!labByName) return res.status(400).json({error: 'Incorrect lab name'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}