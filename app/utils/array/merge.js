/**
 * @param {Array} arr
 * @returns {object}
 */
export default arr => {
    const output = {};
    arr.forEach(elem => Object.assign(output, elem));

    return output;
};
