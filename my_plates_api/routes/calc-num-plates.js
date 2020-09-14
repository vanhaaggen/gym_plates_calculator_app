const calculatePlates = require('../logic/calculate-plates')

module.exports = function (req, res) {
    const { params: { dweight, bweight, aweight } } = req

    try {
        calculatePlates(dweight, bweight, aweight)
            .then(() => res.status(201).json({ message: 'plates correctly calculated' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}