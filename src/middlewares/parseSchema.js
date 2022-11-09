module.exports = schema => {
    return (req = request, res = response, next) => {
        try {
            const result = schema.safeParse(req.body)

            if(!result.success) return res.status(400).json({"error": result.error, path: "inside parseschema"})

            req.body = result.data
    
            next()
        } catch (error) {
            return res.status(500).json({ref: "parse_schema", error})
        }
    }
}