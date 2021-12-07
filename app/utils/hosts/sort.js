/**
 * @param {Array|Set} arr
 * @returns {Array}
 */
export default arr => [...arr]
    .map(elem => elem.split('.').reverse())
    .sort()
    .map(elem => elem.reverse().join('.'));
