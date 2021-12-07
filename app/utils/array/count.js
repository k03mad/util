import convert from './convert.js';

/**
 * @param {Array|*} arr
 * @param {object} values
 * @returns {object}
 */
export default (arr, values = {}) => {
    convert(arr).forEach(elem => {
        values[elem] = ++values[elem] || 1;
    });

    return values;
};
