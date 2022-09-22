require('dotenv').config()

const {Server} = require('./src/libs/servy')

const app = new Server()

app.routes(require('./src/routes/user.route'))

app.listen(process.env.PORT, () => {
    console.log(`Server on http://localhost:${app.port}`);
})