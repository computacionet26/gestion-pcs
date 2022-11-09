const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z, optional} = require('zod')

module.exports = {
    get: async where => await prisma.report.findMany({where}),
    getAll: async () => await prisma.report.findMany(),
    getById: async id => await prisma.report.findUnique({where: {id}}),

    upload: async data => await prisma.report.create({data}),

    delet: async where => await prisma.report.delete({where}),
    deletById: async id => await prisma.report.delete({where: {id}}),

    update: async (where, data) => await prisma.report.update({where, data}),
    updateById: async (id, data) => await prisma.report.update({where: {id}, data}),

    UploadSchema: z.object({
        desc: z.string().min(2).max(255),
    }).strip(),

    UpdateSchema: z.object({
        desc: z.string().min(2).max(255).optional(),
        asignado: z.string().min(1).max(255).optional(),
        asignadoAt: z.string().optional(),
        resolved: z.boolean().optional(),
        resolvedAt: z.string().optional(),
    }).strip()
}