/**
 * Creates a Map object and sets the Weights to rack
 * @param {Number} weights 
 * @returns {Map}
 */

module.exports = function (weights) {
    const platesToRack = new Map()
    for (let i = 0; i <= weights.length - 1; i++) {
        platesToRack.set(weights[i], 0)
    }
    return platesToRack
}