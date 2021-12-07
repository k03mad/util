/**
 * @param {Array} arr
 * @param {number} size
 * @returns {Array}
 */
export default (arr, size) => {
    const tempArr = [...arr];
    const results = [];

    while (tempArr.length > 0) {
        results.push(tempArr.splice(0, size));
    }

    return results;
};
