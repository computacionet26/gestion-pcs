const router = require('express').Router()

const PC = new require('../models/pc.model')
const Report = new require('../models/report.model')
const controller = require('../controllers/pc.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkAdmin = require('../middlewares/checkAdmin')
const checkUser = require('../middlewares/checkUser')
const pcExist = require('../middlewares/pcExist')

router.get('/', [checkAdmin], controller.getAll)
router.get('/:id', [checkAdmin, pcExist], controller.get)
router.post('/report/:id', [checkUser, parseSchema(Report.UploadSchema), pcExist], controller.report)
router.post('/', [checkAdmin, parseSchema(PC.UploadSchema)], controller.post)
router.delete('/:id', [checkAdmin, pcExist], controller.delet)
router.put('/:id', [checkAdmin, parseSchema(PC.UpdateSchema), pcExist], controller.put)

module.exports = router