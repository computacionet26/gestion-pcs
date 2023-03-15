const jwt = require('jsonwebtoken')

module.exports = {
    genToken: async (payload, expiresIn) => {
        try {
            return await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn})
        } catch (error) {
            return null
        }
    },
    getToken: async token => {
        try {
            return await jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {
            return null
        }
    },
    expiredToken: async token => {
        try {
            const resToken = await jwt.verify(token, process.env.SECRET_KEY)
            if (Date.now() >= resToken.exp * 1000) return true
            return false
        } catch (error) {
            return null
        }
    }
}