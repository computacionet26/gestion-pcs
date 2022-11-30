require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user', require('./routes/user.route'))
app.use('/role', require('./routes/role.route'))
app.use('/lab', require('./routes/lab.route'))
app.use('/device', require('./routes/device.route'))

app.listen(port, () => {
    console.log(`Server on http://localhost:${port}`);
})