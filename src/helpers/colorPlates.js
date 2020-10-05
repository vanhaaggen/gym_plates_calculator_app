const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]

const colors = {
    red: 'rgba(239, 35, 60, 1)',
    blue: 'rgba(56, 97, 201, 1)',
    yellow: 'rgba(252, 210, 81, 1)',
    green: 'rgba(55, 198, 62, 1)',
    white: 'rgba(243, 239, 245, 1)',
}

const colorPlates = {
    0: colors.red,
    1: colors.blue,
    2: colors.yellow,
    3: colors.green,
    4: colors.white,
    5: colors.red,
    6: colors.blue,
    7: colors.yellow,
    8: colors.green,
    9: colors.white,
}

/**
 * Gets color depending on value
 * @param {Array} value 
 * 
 * @returns {Array} Array of rgba strings
 */
export default function (value) {
    const result = []
    for (let i = 0; i < value.length; i++) {
        let getKilosIndex = kilos.indexOf(value[i])
        let getPoundsIndex = pounds.indexOf(value[i])

        if (getKilosIndex !== -1) {
            result.push(colorPlates[getKilosIndex])
        } else if (getPoundsIndex !== -1) {
            result.push(colorPlates[getPoundsIndex])
        } else {
            return
        }

    }
    return result
}