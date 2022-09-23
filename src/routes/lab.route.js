const router = require('express').Router()

const Lab = new require('../models/lab.model')
const controller = require('../controllers/lab.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkAdmin = require('../middlewares/checkAdmin')
const labExist = require('../middlewares/labExist')
const labNotExist = require('../middlewares/labNotExist')

router.get('/', [checkAdmin], controller.getAll)
router.get('/:name', [checkAdmin, labExist], controller.get)
router.post('/', [checkAdmin, parseSchema(Lab.UploadSchema), labNotExist], controller.post)
router.delete('/:name', [checkAdmin, labExist], controller.delet)
router.put('/:name', [checkAdmin, labExist, parseSchema(Lab.UpdateSchema)], controller.put)

module.exports = router