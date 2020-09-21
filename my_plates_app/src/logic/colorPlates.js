const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]

const colors = {
    red: '#fc4646',
    blue: '#3861c9',
    yellow: '#fcd251',
    green: '#37c63e',
    white: '#ffffff',
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


export default function (value) {
    let getKilosIndex = kilos.indexOf(parseInt(value))
    let getPoundsIndex = pounds.indexOf(parseInt(value))
    if (getKilosIndex !== -1) {
        return colorPlates[getKilosIndex]
    } else if (getPoundsIndex !== -1) {
        return colorPlates[getPoundsIndex]
    } else {
        return
    }
}