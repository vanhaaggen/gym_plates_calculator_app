const { Router } = require('express')
const bodyParser = require('body-parser')

const calculatePlates = require('../logic/calculate-plates')

const router = Router()
const jsonBodyParser = bodyParser.json()

router.post('/calcnumplate', [jsonBodyParser], calculatePlates)

module.exports = router