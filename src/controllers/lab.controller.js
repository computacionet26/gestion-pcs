const Lab = new require('../models/lab.model')

const get = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const lab = await Lab.getByName(name)

        res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const labs = await Lab.getAll()

        res.status(200).json(labs)
    } catch (error) {
        res.status(500).json({error})
    }
}

const post = async (req = request, res = response) => {
    try {
        const lab = await Lab.upload(req.body)
        
        res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const lab = await Lab.deletByName(name)

        res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {name} = req.params

        const lab = await Lab.updateByName(name, req.body)

        res.status(200).json(lab)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAll,
    get,
    post,
    delet,
    put
}