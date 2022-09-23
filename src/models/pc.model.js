const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.pc.findMany({where}),
    getAll: async () => await prisma.pc.findMany(),
    getById: async id => await prisma.pc.findUnique({where: {id}}),

    upload: async data => await prisma.pc.create({data}),

    delet: async where => await prisma.pc.delete({where}),
    deletById: async id => await prisma.ropcle.delete({where: {id}}),

    update: async (where, data) => await prisma.pc.update({where, data}),
    updateById: async (id, data) => await prisma.pc.update({where: {id}, data}),

    UploadSchema: z.object({
        ram: z.string().min(3).max(255),
        so: z.string().min(3).max(255),
        disc: z.string().min(3).max(255),
        gpu: z.string().min(3).max(255),
        power: z.string().min(3).max(255),
        labId: z.string().min(3).max(255)
    }),
    UpdateSchema: z.object({
        ram: z.string().min(3).max(255).optional(),
        so: z.string().min(3).max(255).optional(),
        disc: z.string().min(3).max(255).optional(),
        gpu: z.string().min(3).max(255).optional(),
        power: z.string().min(3).max(255).optional(),
        labId: z.string().min(3).max(255).optional(),
        avalibre: z.boolean().optional()
    })
}