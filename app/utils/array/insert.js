/**
 * @param {Array} arr
 * @param {number} index
 * @param {*} item
 * @returns {Array}
 */
export default (arr, index, item) => [
    ...arr.slice(0, index),
    item,
    ...arr.slice(index),
];
