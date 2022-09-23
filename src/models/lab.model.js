const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.lab.findMany({where}),
    getAll: async () => await prisma.lab.findMany(),
    getByName: async name => await prisma.lab.findUnique({where: {name}}),
    getById: async id => await prisma.lab.findUnique({where: {id}}),

    upload: async data => await prisma.lab.create({data}),

    delet: async where => await prisma.lab.delete({where}),
    deletByName: async name => await prisma.lab.delete({where: {name}}),
    deletById: async id => await prisma.lab.delete({where: {id}}),

    update: async (where, data) => await prisma.lab.update({where, data}),
    updateByName: async (name, data) => await prisma.lab.update({where: {name}, data}),
    updateById: async (id, data) => await prisma.lab.update({where: {id}, data}),

    UploadSchema: z.object({
        name: z.string().length(1)
    }),
    UpdateSchema: z.object({
        name: z.string().length(1)
    })
}