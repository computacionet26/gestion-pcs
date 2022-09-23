require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use('/user', require('./src/routes/user.route'))
app.use('/role', require('./src/routes/role.route'))
app.use('/lab', require('./src/routes/lab.route'))
// app.use('/pc', require('./src/routes/pc.route'))

app.listen(process.env.PORT, () => {
    console.log(`Server on http://localhost:${app.port}`);
})