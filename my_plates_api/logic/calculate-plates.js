const helper = require('../helpers')
const { setRack, addAvailablePlates, filterArr, hasEnoughPlates } = helper

const validate = {
    number(target, name) {
        if (target === '') throw new Error(`${name} parameter is empty or blank`)
        if (typeof target != 'number') throw TypeError(`${name} parameter is not a Number`)
    },
    array(target, name) {
        if (!Array.isArray(target)) throw new Error(`${name} parameter is not an Array`)
    }
}

const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]


function calcPlates(desiredWeight, barWeight, weightsAvail, units) {
    validate.number(desiredWeight, 'desiredWeight')
    validate.number(barWeight, 'barWeight')
    validate.array(weightsAvail, 'weightsAvail')

    console.log('calculate-plates: ', units)
    let weights = units === 'kilos' ? kilos : pounds
    let platesToRack = setRack(weights)
    let platesAvailable = addAvailablePlates(weights, weightsAvail)
    let amountLeft = desiredWeight - barWeight

    let checkWeight = hasEnoughPlates(platesAvailable, amountLeft)

    if (!checkWeight) {
        throw new Error('You have not enough plates available')
    }

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

    return platesToRack

}

module.exports = function (desiredWeight, barWeight, weightsAvail, units) {
    return (async () => {

        const arr = []
        const mapToArr = (value, key) => arr[arr.length] = [key, value]

        const result = await calcPlates(desiredWeight, barWeight, weightsAvail, units)
        result.forEach(mapToArr)
        const response = filterArr(arr)

        return response
    })()
}

