require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user', require('./src/routes/user.route'))
app.use('/role', require('./src/routes/role.route'))
app.use('/lab', require('./src/routes/lab.route'))
app.use('/pc', require('./src/routes/pc.route'))

app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`);
})