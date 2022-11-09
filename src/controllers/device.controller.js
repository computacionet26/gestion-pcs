const Device = new require('../models/device.model')
const Report = new require('../models/report.model')
const User = new require('../models/user.model')
const {getToken, expiredToken} = require('../utils/jwt')

const get = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const device = await Device.getById(id)

        res.status(200).json(device)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const devices = await Device.getAll()

        res.status(200).json(devices)
    } catch (error) {
        res.status(500).json({error})
    }
}

const report = async (req = request, res = response) => {
    try {
        const deviceId = req.params.id
        const token = req.header('Authorization')
        const user = await getToken(token)
        const {desc} = req.body

        const device = await Device.getById(parseInt(deviceId))

        const report = await Report.upload({
            deviceId,
            deviceType: device.type,
            lab: device.lab,
            labId: device.labId,
            userId: user.id,
            user: user.name,
            desc
        })
        res.status(200).json(report)
    } catch (error) {
        console.log({ref: 'device_controller', error});
        res.status(500).json({error})
    }
}

const reports = async (req = request, res = response) => {
    try {
        const reports = await Report.getAll()

        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json({error})
    }
}

const post = async (req = request, res = response) => {
    console.log(req.body);
    try {
        const device = await Device.upload(req.body)
        
        res.status(200).json(device)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const device = await Device.deletById(parseInt(id))

        res.status(200).json(device)
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

const putReport = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const report = await Report.updateById(id, req.body)

        res.status(200).json(report)
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const device = await Device.updateById(id, req.body)

        res.status(200).json(device)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAll,
    get,
    report,
    reports,
    deleteReport,
    putReport,
    post,
    delet,
    put
}