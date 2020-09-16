const setRack = require('../logic/setRack')
const addAvailablePlates = require('../logic/addAvailablePlates')

const validate = {
    number(target, name) {
        if (target === '') throw new Error(`${name} parameter is empty or blank`)
        if (typeof target != 'number') throw TypeError(`${name} parameter is not a Number`)
    },
    array(target, name) {
        if (!Array.isArray(target)) throw new Error(`${name} parameter is not an Array`)
    }
}

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]
const pounds = [100, 55, 45, 35, 25, 10, 5, 2.5, 1.25]
//Convierte este en una Pomise que devuelva un objeto.
function calcPlates(desiredWeight, barWeight, weightsAvail, units) {
    validate.number(desiredWeight, 'desiredWeight')
    validate.number(barWeight, 'barWeight')
    validate.array(weightsAvail, 'weightsAvail')

    console.log('calculate-plates: ', units)
    let weights = units === 'kilos' ? kilos : pounds
    let platesToRack = setRack(weights)
    let platesAvailable = addAvailablePlates(weights, weightsAvail)
    let amountLeft = desiredWeight - barWeight

    while (amountLeft > 0) {
        let found = false
        for (let [weight, numPlates] of platesAvailable) {
            let amount = weight * 2

            if (numPlates > 0 && amount <= amountLeft) {
                amountLeft -= amount
                platesAvailable.set(weight, numPlates - 2)
                platesToRack.set(weight, platesToRack.get(weight) + 2)
                found = true
                break
            }
        }
        if (!found) {
            break
        }
    }
    // console.log('Plates to Rack: ', platesToRack)
    // console.log('Plates left: ', platesAvailable)

    return platesToRack

}

module.exports = function (desiredWeight, barWeight, weightsAvail, units) {
    return (async () => {

        const obj = {}
        const mapToObj = (value, key, map) => obj[`w${key}`] = value

        const result = await calcPlates(desiredWeight, barWeight, weightsAvail, units)
        result.forEach(mapToObj)
        return obj
    })()
}

