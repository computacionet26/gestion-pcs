const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')

module.exports = {
    get: async where => await prisma.device.findMany({where}),
    getAll: async () => await prisma.device.findMany(),
    getById: async id => await prisma.device.findUnique({where: {id}}),

    upload: async data => await prisma.device.create({data}),

    delet: async where => await prisma.device.delete({where}),
    deletById: async id => await prisma.device.delete({where: {id}}),

    update: async (where, data) => await prisma.device.update({where, data}),
    updateById: async (id, data) => await prisma.device.update({where: {id}, data}),

    UploadSchema: z.object({
        type: z.string().min(1).max(255).optional(),
        ram: z.string().min(3).max(255).optional(),
        so: z.string().min(3).max(255).optional(),
        disc: z.string().min(3).max(255).optional(),
        gpu: z.string().min(3).max(255).optional(),
        cpu: z.string().min(3).max(255).optional(),
        power: z.string().min(3).max(255).optional(),
        lab: z.string().min(3).max(255),
        labId: z.string().min(3).max(255)
    }),
    UpdateSchema: z.object({
        type: z.string().min(1).max(255).optional(),
        ram: z.string().min(3).max(255).optional(),
        so: z.string().min(3).max(255).optional(),
        disc: z.string().min(3).max(255).optional(),
        cpu: z.string().min(3).max(255).optional(),
        gpu: z.string().min(3).max(255).optional(),
        power: z.string().min(3).max(255).optional(),
        lab: z.string().min(3).max(255).optional(),
        labId: z.string().min(3).max(255).optional(),
        avalibre: z.boolean().optional()
    })
}