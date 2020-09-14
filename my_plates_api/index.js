const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const { name, version } = require('./package')
const calculatePlates = require('./logic/calculate-plates')
const querystring = require('querystring')


router.get('/calcnumplate/:data', [jsonBodyParser], async function (req, res) {

    let data = querystring.parse(req.params.data)
    let json2data = JSON.parse(data.data)
    const { dweight, bweight, wavail } = json2data

    if (isNaN(dweight) || isNaN(bweight)) {
        res.status(400)
        res.json({ error: "Bad request" })
    }

    try {
        await calculatePlates(dweight, bweight, wavail)
            .then(result => res.status(201).json({ message: 'plates correctly calculated', result }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }

})


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.listen(8080, () => console.log(`${name} ${version} up and running on port 8080`))