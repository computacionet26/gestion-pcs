const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const {z} = require('zod')
const bcrypt = require('bcryptjs')

module.exports = {
    get: async where => await prisma.user.findUnique({where}),
    getAll: async () => await prisma.user.findMany(),
    getManyByUsername: async username => await prisma.user.findMany({where: {username: {contains: username}}}),
    getByEmail: async email => await prisma.user.findUnique({where: {email}}),
    getByUsername: async username => await prisma.user.findUnique({where: {username}}),
    getById: async id => await prisma.user.findUnique({where: {id}}),

    delet: async where => await prisma.user.delete({where}),
    deletByEmail: async email => await prisma.user.delete({where: {email}}),
    deletByUsername: async username => await prisma.user.delete({where: {username}}),
    deletById: async id => await prisma.user.delete({where: {id}}),

    update: async (where, data) => await prisma.user.update({where, data}),
    updateByEmail: async (email, data) => await prisma.user.update({where: {email}, data}),
    updateByUsername: async (username, data) => {
        return await prisma.user.update({where: {username}, data})
    },
    updateById: async (id, data) => await prisma.user.update({where: {id}, data}),

    register: async data => await prisma.user.create({data}),
    login: async data => {
        const user = await prisma.user.findUnique({where: data.username? {username: data.username} : {email: data.email}})
        const compare = await bcrypt.compareSync(data.password, user.password)
        if(!compare) throw new Error('Incorrect username, email or password.')
        return user
    },

    RegisterSchema: z.object({
        username: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(3).max(255),
        roles: z.string().min(3).max(255),
    }),
    LoginSchema: z.object({
        username: z.string().min(3).max(255),
        password: z.string().min(3).max(255)
    }),
    UpdateSchema: z.object({
        username: z.string().min(3).max(255).optional(),
        email: z.string().email().optional(),
        password: z.string().min(3).max(255).optional()
        // roles: z.string().min(3).max(255).optional()
    }),
}