const UserRole = new require('../models/userrole.model')
const controller = require('../controllers/userrole.controller')

const parseSchema = require('../middlewares/parseSchema')
const userRoleExist = require('../middlewares/userRoleExist')
const userRoleNotExist = require('../middlewares/userRoleNotExist')
const checkAdmin = require('../middlewares/checkAdmin')

module.exports = [
    {
        url: "/userrole",
        method: "GET",
        middleware: [checkAdmin],
        controller: controller.getAll
    },
    {
        url: "/userrole/:name",
        method: "GET",
        middleware: [userRoleExist, checkAdmin],
        controller: controller.get
    },
    {
        url: "/userrole",
        method: "POST",
        middleware: [parseSchema(UserRole.UploadSchema), userRoleNotExist, checkAdmin],
        controller: controller.post
    },
    {
        url: "/userrole/:name",
        method: "PUT",
        middleware: [parseSchema(UserRole.UpdateSchema), userRoleExist, checkAdmin],
        controller: controller.put
    },
    {
        url: "/userrole/:name",
        method: "DELETE",
        middleware: [userRoleExist, checkAdmin],
        controller: controller.delete
    },
]