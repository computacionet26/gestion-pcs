const router = require('express').Router()

const PC = new require('../models/pc.model')
const Report = new require('../models/report.model')
const controller = require('../controllers/pc.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkTecnic = require('../middlewares/checkTecnic')
const checkUser = require('../middlewares/checkUser')
const pcExist = require('../middlewares/pcExist')

router.get('/', [checkTecnic], controller.getAll)
router.get('/:id', [checkTecnic, pcExist], controller.get)
router.post('/report/:id', [checkUser, parseSchema(Report.UploadSchema), pcExist], controller.report)
router.delete('/report/:id', [checkTecnic], controller.deleteReport)
router.post('/', [checkTecnic, parseSchema(PC.UploadSchema)], controller.post)
router.delete('/:id', [checkTecnic, pcExist], controller.delet)
router.put('/:id', [checkTecnic, parseSchema(PC.UpdateSchema), pcExist], controller.put)

module.exports = router