const router = require('express').Router()

const User = new require('../models/user.model')
const controller = require('../controllers/user.controller')

const parseSchema = require('../middlewares/parseSchema')
const encryptPassword = require('../middlewares/encryptPassword')
const register = require('../middlewares/register')
const login = require('../middlewares/login')
const checkAdmin = require('../middlewares/checkAdmin')
const usernameExist = require('../middlewares/usernameExist')

router.post('/register', [parseSchema(User.RegisterSchema), encryptPassword, register], controller.register)
//router.post('/register', [checkAdmin, parseSchema(User.RegisterSchema), encryptPassword, register], controller.register)
router.post('/login', [parseSchema(User.LoginSchema), login], controller.login)

router.get('/', [checkAdmin], controller.getAll)
router.get('/:username', [usernameExist], controller.get)
router.delete('/:username', [checkAdmin, usernameExist], controller.delet)
router.put('/:username', [checkAdmin, usernameExist, parseSchema(User.UpdateSchema), encryptPassword], controller.put)

module.exports = router
