const User = new require('../models/user.model')
const Role = new require('../models/role.model')
const UserRole = new require('../models/userRole.model')
const {expiredToken, genToken, getToken} = require('../utils/jwt')

const register = async (req = request, res = response) => {
    try {
        const {username, email, password, roles} = req.body

        const user = await User.register({username, email, password})

		const rolesNamesList = roles.split(',')
		
		const rolesList = await Promise.all(
			rolesNamesList.map(async roleName => {
				const role = await Role.getByName(roleName)
				
				await UserRole.upload({
					userId: user.id,
					roleId: role.id
				})
			})
		)

        res.status(200).json({...user, roles})
    } catch (error) {
        res.status(500).json({error})
    }
}

const login = async (req = request, res = response) => {
    try {
        const user = await User.login(req.body)
        //console.log({id: user.id, name: user.username});
        const token = await genToken({id: user.id, name: user.username}, '360d')
        console.log(token);
        const UserRoles = await UserRole.getByUserId(user.id)
        
        const roles = await Promise.all(
            UserRoles.map(async x => {
              return (await Role.getById(x.roleId)).name
            })
        )

        res.status(200).json({
            token,
            email: user.email,
            username: user.username,
            roles
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const getById = async (req = request, res = response) => {
    try {
        const {id} = req.params

        const user = await User.getById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const get = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.getByUsername(username)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAll = async (req = request, res = response) => {
    try {
        const users = await User.getAll()
		
		const userWithRoles = await Promise.all(
			users.map(async user => {
				const UserRoles = await UserRole.getByUserId(user.id)
			
				const roles = await Promise.all(
					UserRoles.map(async x => {
					  return (await Role.getById(x.roleId)).name
					})
				)
				
				user.roles = roles
				return user
			})
		)

        res.status(200).json(userWithRoles)
    } catch (error) {
        res.status(500).json({error})
    }
}

const delet = async (req = request, res = response) => {
    try {
        const {username} = req.params

        const user = await User.deletByUsername(username)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

const put = async (req = request, res = response) => {
    try {
        const {username} = req.params
		const updateUsername = req.body.username
		const updateEmail = req.body.email
		const updatePassword = req.body.password
		const updateRole = req.body.roles
				
		const user = await User.updateByUsername(username, {username: updateUsername, email: updateEmail, password: updatePassword})

        console.log(user);
        console.log({userId: user.id});
        try {
            await UserRole.delet({userId: user.id})
        } catch (error) {
            console.log(error);
        }
        
		const role = await Role.getByName(updateRole)
		await UserRole.upload({
			userId: user.id,
			roleId: role.id
		})

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    login,
    register,
    get,
    delet,
    put,
    getAll,
    getById
}