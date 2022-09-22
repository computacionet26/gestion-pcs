const jwt = require('jsonwebtoken')

module.exports = {
    genToken: async (payload, expiresIn) => {
        try {
            return await jwt.sign(payload, process.env.secret_key, {expiresIn})
        } catch (error) {
            return null
        }
    },
    getToken: async token => {
        try {
            return await jwt.verify(token, process.env.secret_key)
        } catch (error) {
            return null
        }
    },
    expiredToken: async token => {
        try {
            const resToken = await jwt.verify(token, process.env.secret_key)
            if (Date.now() >= resToken.exp * 1000) return true
            return false
        } catch (error) {
            return null
        }
    }
}