const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.userRole.findMany({where}),
    getByUserId: async userId => await prisma.userRole.findMany({where: {userId}}),
    getByRoleId: async roleId => await prisma.userRole.findMany({where: {roleId}}),
    getAll: async () => await prisma.userRole.findMany(),
    getById: async id => await prisma.userRole.findUnique({where: {id}}),

    upload: async data => await prisma.userRole.create({data}),

    delet: async where => await prisma.userRole.deleteMany({where}),
    deletById: async id => await prisma.userRole.delete({where: {id}}),

    update: async (where, data) => await prisma.userRole.update({where, data}),
    updateById: async (id, data) => await prisma.userRole.update({where: {id}, data}),

    UploadSchema: z.object({
        userId: z.string().min(3).max(255),
        roleId: z.string().min(3).max(255),
    }).strip()
}