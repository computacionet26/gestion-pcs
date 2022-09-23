const Lab = require('../models/lab.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {name} = req.body

        const labByName = await Lab.getByName(name)
        if(labByName) return res.status(400).json({error: 'Lab name already exist'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}