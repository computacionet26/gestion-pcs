const PC = new require('../models/pc.model')
const Report = new require('../models/report.model')
const {getToken, expiredToken} = require('../utils/jwt')

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
    console.log(req.body);
    try {
        const pcId = req.params.id
        const token = req.header('Authorization')
        const user = await getToken(token)
        const {desc} = req.body

        console.log({
            pcId,
            userId: user.id,
            desc
        });

        const report = await Report.upload({
            pcId,
            userId: user.id,
            desc
        })
        res.status(200).json(report)
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

const deleteReport = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const report = await Report.deletById(id)

        res.status(200).json(report)
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
    deleteReport,
    post,
    delet,
    put
}