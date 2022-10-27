const router = require('express').Router()

const Device = new require('../models/device.model')
const Report = new require('../models/report.model')
const controller = require('../controllers/device.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkTecnic = require('../middlewares/checkTecnic')
const checkUser = require('../middlewares/checkUser')
const deviceExist = require('../middlewares/deviceExist')

router.post('/report/:id', [checkUser, parseSchema(Report.UploadSchema), deviceExist], controller.report)
router.get('/', [checkTecnic], controller.getAll)
router.get('/reports', [checkTecnic], controller.reports)
router.get('/:id', [checkUser, deviceExist], controller.get)
router.delete('/report/:id', [checkTecnic], controller.deleteReport)
router.put('/report/:id', [checkTecnic], controller.putReport)
router.post('/', [checkTecnic, parseSchema(Device.UploadSchema)], controller.post)
router.delete('/:id', [checkTecnic, deviceExist], controller.delet)
router.put('/:id', [checkTecnic, parseSchema(Device.UpdateSchema), deviceExist], controller.put)

module.exports = router