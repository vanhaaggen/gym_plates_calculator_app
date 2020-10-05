const URL = 'https://whispering-river-40522.herokuapp.com/api'
//const URL = 'http://localhost:8080/api'

export default function () {
    return (async () => {
        const response = await fetch(`${URL}/wakeup`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/JSON',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }


        return response.json()
    })()
}