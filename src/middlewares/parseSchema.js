module.exports = schema => {
    return (req = request, res = response, next) => {
        try {
            const result = schema.safeParse(req.body)

            if(!result.success) return res.status(400).json({"error": result.error})
    
            next()
        } catch (error) {
            return res.status(500).json({error})
        }
    }
}