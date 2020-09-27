const URL = 'https://whispering-river-40522.herokuapp.com/api'
//const URL = 'http://localhost:8080/api'
const querystring = require('querystring')

const validate = {
    number(target, name) {
        if (target === '') throw new Error(`${name} parameter is empty or blank`)
        if (typeof target != 'number') throw TypeError(`${name} parameter is not a Number`)
    },
    array(target, name) {
        if (!Array.isArray(target)) throw new Error(`${name} parameter is not an Array`)
    }
}

function calcWeights(desiredWeight, barWeight, weightsAvail, units) {
    validate.number(desiredWeight, 'desiredWeight')
    validate.number(barWeight, 'barWeight')
    validate.array(weightsAvail, 'weightsAvail')

    let data = {
        'dweight': desiredWeight,
        'bweight': barWeight,
        'wavail': weightsAvail,
        'units': units
    }
    let xurldata = querystring.stringify({ 'data': JSON.stringify(data) })
    console.log('calcWeights: ', { units, xurldata })
    return (async () => {
        const response = await fetch(`${URL}/calcnumplate/${xurldata}`, {
            method: 'GET',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'text/JSON',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Origin': 'https://5f707f5429ed4d000785f93f--mystifying-galileo-73413d.netlify.app'
            }
        })

        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }


        return response.json()

    })()
}

export default calcWeights