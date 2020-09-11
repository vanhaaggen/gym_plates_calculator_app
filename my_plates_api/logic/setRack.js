/**
 * Creates a Map object and sets the Weights to rack
 * @returns {Map}
 */

module.exports = function () {
    const platesToRack = new Map()
    for (let i = 0; i <= weights.length - 1; i++) {
        platesToRack.set(weights[i], 0)
    }
    return platesToRack
}