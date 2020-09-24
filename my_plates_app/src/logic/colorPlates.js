const kilos = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5]
const pounds = [55, 44, 33, 22, 11, 5.5, 4.4, 3.3, 2.2, 1.1]

const colors = {
    red: 'rgba(239, 35, 60, 1)',
    blue: 'rgba(56, 97, 201, 1)',
    yellow: 'rgba(252, 210, 81, 1)',
    green: 'rgba(55, 198, 62, 1)',
    white: 'rgba(255, 255, 255, 1)',
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
    let getKilosIndex = kilos.indexOf(value * 1)
    let getPoundsIndex = pounds.indexOf(value * 1)
    if (getKilosIndex !== -1) {
        return colorPlates[getKilosIndex]
    } else if (getPoundsIndex !== -1) {
        return colorPlates[getPoundsIndex]
    } else {
        return
    }
}