
/**
 * Transforms 2D array into 1D
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
