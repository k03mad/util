/**
 * @param {Array} arr
 * @param {number} index
 * @param {*} newItem
 * @returns {Array}
 */
export default (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index),
];
