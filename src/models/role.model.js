const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.role.findMany({where}),
    getAll: async () => await prisma.role.findMany(),
    getByName: async name => await prisma.role.findUnique({where: {name}}),
    getById: async id => await prisma.role.findUnique({where: {id}}),

    upload: async data => await prisma.role.create({data}),

    delet: async where => await prisma.role.delete({where}),
    deletByName: async name => await prisma.role.delete({where: {name}}),
    deletById: async id => await prisma.role.delete({where: {id}}),

    update: async (where, data) => await prisma.role.update({where, data}),
    updateByName: async (name, data) => await prisma.role.update({where: {name}, data}),
    updateById: async (id, data) => await prisma.role.update({where: {id}, data}),

    UploadSchema: z.object({
        name: z.string().min(3).max(255)
    }),
    UpdateSchema: z.object({
        name: z.string().min(3).max(255)
    })
}