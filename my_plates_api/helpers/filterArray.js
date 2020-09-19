/**
 * Filters over 2 dimensional array
 * 
 * @param {Array} arr 
 * 
 * @return {Array}
 */

module.exports = function (arr) {
    let response = []
    for (let i = 0; i < arr.length; i++) {
        arr[i][1] > 0 ? response.push(arr[i]) : ''
    }
    return response
}