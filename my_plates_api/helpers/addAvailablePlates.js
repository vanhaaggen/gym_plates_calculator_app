/**
 * Creates a Map object and sets the available weights as Keys.
 * 
 * @param {*} weights 
 * @param {*} weightsAvailable 
 * 
 * @returns {Map}
 */
module.exports = function addAvailablePlates(weights, weightsAvailable) {
    const platesAvailable = new Map()
    for (let i = 0; i <= weights.length - 1; i++) {
        platesAvailable.set(weights[i], weightsAvailable[i])
    }
    return platesAvailable
}