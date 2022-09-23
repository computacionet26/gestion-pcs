const PC = require('../models/pc.model')

module.exports = async (req = request, res = response, next) => {
    try {
        const {id} = req.params

        const pcById = await PC.getById(id)
        if(!pcById) return res.status(400).json({error: 'Incorrect PC ID'})
    
        next()
    } catch (error) {
        return res.status(500).json({error})
    }
}