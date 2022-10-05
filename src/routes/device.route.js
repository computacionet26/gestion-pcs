const router = require('express').Router()

const Device = new require('../models/device.model')
const Report = new require('../models/report.model')
const controller = require('../controllers/device.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkTecnic = require('../middlewares/checkTecnic')
const checkUser = require('../middlewares/checkUser')
const deviceExist = require('../middlewares/deviceExist')

router.get('/', [checkTecnic], controller.getAll)
router.get('/:id', [checkUser, deviceExist], controller.get)
router.post('/report/:id', [checkUser, parseSchema(Report.UploadSchema), deviceExist], controller.report)
router.delete('/report/:id', [checkTecnic], controller.deleteReport)
router.post('/', [checkTecnic, parseSchema(Device.UploadSchema)], controller.post)
router.delete('/:id', [checkTecnic, deviceExist], controller.delet)
router.put('/:id', [checkTecnic, parseSchema(Device.UpdateSchema), deviceExist], controller.put)

module.exports = router