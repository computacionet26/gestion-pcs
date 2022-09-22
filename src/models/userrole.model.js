const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.userrole.findUnique({where}),
    getAll: async () => await prisma.userrole.findMany(),
    getById: async id => await prisma.userrole.findUnique({where: {id}}),

    register: async data => await prisma.user.create({data}),

    delet: async where => await prisma.userrole.delete({where}),
    deletById: async id => await prisma.userrole.delete({where: {id}}),

    update: async (where, data) => await prisma.userrole.update({where, data}),
    updateById: async (id, data) => await prisma.role.update({where: {id}, data}),

    UploadSchema: z.object({
        userId: z.string().min(3).max(255),
        roleId: z.string().min(3).max(255),
    }),
    UpdateSchema: z.object({
        userId: z.string().min(3).max(255),
        roleId: z.string().min(3).max(255),
    }),
}