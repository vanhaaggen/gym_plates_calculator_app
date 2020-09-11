const express = require('express')
const { name, version } = require('./package')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(cors())
app.use('/api', routes)
app.listen(8080, () => console.log(`${name} ${version} up and running on port 8080`))