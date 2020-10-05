/**
 * @callback function as parameter
 * @param {Array} fn1
 * 
 * @callback function as parameter
 * @param {Array} fn2 
 */
export default function (fn1, fn2) {
    const fn1Result = fn1
    const fn2Result = fn2
    const result = []

    for (let i = 0; i < fn1Result.length; i++) {
        result.push({
            label: i,
            barPercentage: 0.5,
            barThickness: 'flex',
            data: [fn1Result[i]],
            backgroundColor: fn2Result[i],
        })
    }

    return result
}