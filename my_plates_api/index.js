const express = require('express')
const router = express.Router()
const cors = require('cors')
//const bodyParser = require('body-parser')
//const jsonBodyParser = bodyParser.json()
const { name, version } = require('./package')
const calculatePlates = require('./routes/calc-num-plates')


router.get('/calcnumplate/:data', calculatePlates)


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.listen(8080, () => console.log(`${name} ${version} up and running on port 8080`))