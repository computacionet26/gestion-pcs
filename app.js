require('dotenv').config()

const {Server} = require('./src/libs/servy')

const app = new Server()

app.listen(process.env.PORT, () => {
    console.log(`Server on http://localhost:${app.port}`);
})