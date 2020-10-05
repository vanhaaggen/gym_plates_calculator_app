function getAvailPlatesfromDOM(DOMNode) {
    const result = []
    for (let i = 0; i < DOMNode.length; i++) {
        let inputValue = Number(DOMNode[i].value)
        result.push(inputValue)
    }
    return result
}

export default getAvailPlatesfromDOM