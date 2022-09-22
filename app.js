require('dotenv').config()

const {Server} = require('./src/libs/servy')

const app = new Server()

app.route(require('./src/routes/user.route'))
app.route(require('./src/routes/role.route'))
// app.route(require('./src/routes/userrole.route'))
// app.route(require('./src/routes/pc.route'))
// app.route(require('./src/routes/lab.route'))

app.listen(process.env.PORT, () => {
    console.log(`Server on http://localhost:${app.port}`);
})