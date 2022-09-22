const Role = new require('../models/role.model')
const controller = require('../controllers/role.controller')

const parseSchema = require('../middlewares/parseSchema')
const roleExist = require('../middlewares/roleExist')
const roleNotExist = require('../middlewares/roleNotExist')
const checkAdmin = require('../middlewares/checkAdmin')

module.exports = [
    {
        url: "/role",
        method: "GET",
        middleware: [checkAdmin],
        controller: controller.getAll
    },
    {
        url: "/role/:name",
        method: "GET",
        middleware: [roleExist, checkAdmin],
        controller: controller.get
    },
    {
        url: "/role",
        method: "POST",
        middleware: [parseSchema(Role.UploadSchema), roleNotExist, checkAdmin],
        controller: controller.post
    },
    {
        url: "/user/:name",
        method: "PUT",
        middleware: [parseSchema(Role.UpdateSchema), roleExist, checkAdmin],
        controller: controller.put
    },
    {
        url: "/user/:name",
        method: "DELETE",
        middleware: [roleExist, checkAdmin],
        controller: controller.delete
    },
]