
/**
 * Separates weight and amount from an 2D into an 1D array
 * @param {Array} array
 * @param {Number} arrayPosition 
 * @return {Array} one dimensional array
 */
export default function (array, arrayPosition) {
    const response = []
    for (let i = 0; i < array.length; i++) {
        response.push(array[i][arrayPosition])
    }
    return response
}
