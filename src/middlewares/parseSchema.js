module.exports = schema => {
    return (req = request, res = response, next) => {
        console.log({
            url: req.url, 
            body: req.body, 
            params: req.params, 
            token: req.headers.authorization
        });
        try {
            const result = schema.safeParse(req.body)

            if(!result.success) return res.status(400).json({"error": result.error})
    
            next()
        } catch (error) {
            return res.status(500).json({ref: "parse_schema", error})
        }
    }
}