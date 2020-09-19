/**
 * Checks whether there is enough weight or not
 * @param {Map} mapObj 
 * @param {Number} weightLeft 
 * @return {Boolean}
 */
module.exports = function (mapObj, weightLeft) {
    const arr = []

    for (let [weight, amount] of mapObj) {
        arr.push(weight * amount)
    }

    const weightAvailable = arr.reduce((prev, curr) => prev + curr)

    return weightLeft > weightAvailable ? false : true
}