const router = require('express').Router()

const Role = new require('../models/role.model')
const controller = require('../controllers/role.controller')

const parseSchema = require('../middlewares/parseSchema')
const checkAdmin = require('../middlewares/checkAdmin')
const roleExist = require('../middlewares/roleExist')

router.get('/', [checkAdmin], controller.getAll)
router.get('/:name', [checkAdmin, roleExist], controller.get)
router.post('/', [checkAdmin], controller.post)
router.delete('/:name', [checkAdmin, roleExist], controller.delet)
router.put('/:name', [checkAdmin, roleExist, parseSchema(Role.UpdateSchema)], controller.put)

module.exports = router