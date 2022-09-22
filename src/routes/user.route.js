const User = new require('../models/user.model')
const controller = require('../controllers/user.controller')

const parseSchema = require('../middlewares/parseSchema')
const encryptPassword = require('../middlewares/encryptPassword')
const register = require('../middlewares/register')
const login = require('../middlewares/login')
const checkAdmin = require('../middlewares/checkAdmin')
const usernameExist = require('../middlewares/usernameExist')

module.exports = [
    {
        url: "/user/register",
        method: "POST",
        middleware: [parseSchema(User.RegisterSchema), encryptPassword, register],
        controller: controller.register
    },
    {
        url: "/user/login",
        method: "POST",
        middleware: [parseSchema(User.LoginSchema), login],
        controller: controller.login
    },
    {
        url: "/user",
        method: "GET",
        middleware: [checkAdmin],
        controller: controller.getAll
    },
    {
        url: "/user/:name",
        method: "GET",
        middleware: [usernameExist],
        controller: controller.get
    },
    {
        url: "/user/:name",
        method: "PUT",
        middleware: [parseSchema(User.UpdateShema), usernameExist, checkAdmin],
        controller: controller.put
    },
    {
        url: "/user/:name",
        method: "DELETE",
        middleware: [usernameExist, checkAdmin],
        controller: controller.delete
    },
]