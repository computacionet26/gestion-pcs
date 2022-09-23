const PC = new require('../models/pc.model')

const get = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const pc = await PC.getById(id)

        res.status(200).json(pc)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const pcs = await PC.getAll()

        res.status(200).json(pcs)
    } catch (error) {
        res.status(500).json({error})
    }
}

const report = async (req = request, res = response) => {
    try {
        // const pc = await Lab.upload(req.body)
        
        res.status(200).json(req.body)
    } catch (error) {
        res.status(500).json({error})
    }
}

const post = async (req = request, res = response) => {
    try {
        const pc = await PC.upload(req.body)
        
        res.status(200).json(pc)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const pc = await PC.deletById(id)

        res.status(200).json(pc)
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const pc = await Lab.updateById(id, req.body)

        res.status(200).json(pc)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAll,
    get,
    report,
    post,
    delet,
    put
}