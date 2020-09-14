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

//Convierte este en una Pomise que devuelva un objeto.
async function calcPlates(desiredWeight, barWeight, weightsAvail) {
    validate.number(desiredWeight, 'desiredWeight')
    validate.number(barWeight, 'barWeight')
    validate.array(weightsAvail, 'weightsAvail')

    const weights = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1]
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

module.exports = function (desiredWeight, barWeight, weightsAvail) {
    return (async () => {

        const obj = {}
        const mapToObj = (value, key, map) => obj[key] = value

        const result = await calcPlates(desiredWeight, barWeight, weightsAvail)
        result.forEach(mapToObj)
        return obj
    })()
}

