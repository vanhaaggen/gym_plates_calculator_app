const calculatePlates = require('../logic/calculate-plates')
const querystring = require('querystring')

module.exports = function (req, res) {
    let data = querystring.parse(req.params.data)
    let json2data = JSON.parse(data.data)
    const { dweight, bweight, wavail, units } = json2data

    if (isNaN(dweight) || isNaN(bweight)) {
        res.status(400)
        res.json({ error: "Bad request" })
    }

    try {
        console.log('calc-num-plates: ', units)
        calculatePlates(dweight, bweight, wavail, units)
            .then(result => res.status(201).json({ message: 'plates correctly calculated', result }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}