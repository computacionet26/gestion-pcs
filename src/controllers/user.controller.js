const User = new require('../models/user.model')
const {expiredToken, genToken, getToken} = require('../helpers/jwt')
const sendEmail = require('../helpers/sendEmail')
const confirmAccountEmail = require('../helpers/confirmAccountEmail.html')

const register = async (req = request, res = response) => {
    try {
        const {email} = req.body

        const token = await genToken(req.body, '3h')

        await sendEmail({
            email,
            service: 'gmail',
            from: process.env.APP_NAME,
            subject: `Confirm account - ${process.env.APP_NAME}`,
            html: confirmAccountEmail(process.env.URL, token)
        })

        res.status(201).json({msg: 'Please confirm account in your email'})
    } catch (error) {
        res.status(500).json({error})
    }
}

const confirm = async (req = request, res = response) => {
    try {
        const {token} = req.params
        if(!await expiredToken(token)){
            const {username, email, password} = await getToken(token)

            if(email) await User.register({username, email, password})
        }else{
            console.log('Token expired');
        }
    } catch (error) {}
    res.send("<script>window.close();</script>")
}

const login = async (req = request, res = response) => {
    try {
        const user = await User.login(req.body)
        const token = await genToken({id: user.id, name: user.username, role: user.role}, '30d')
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getById = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const user = await User.getById(id)

        res.status(200).json({
            username: user.username,
            createdAt: user.createdAt,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const get = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.getByUsername(username)

        res.status(200).json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const users = await User.getAll()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.deletByUsername(username)

        res.status(200).json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {username} = req.params
        const user = await User.updateByUsername(username, req.body)

        res.status(200).json({
            id: user.id,
            createdAt: user.createdAt,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    login,
    register,
    confirm,
    get,
    delet,
    put,
    getAll
}