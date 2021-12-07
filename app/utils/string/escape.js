/**
 * @param {string} str
 * @param {Array} chars
 * @returns {string}
 */
export default (str, chars = '*_`[') => str.replace(
    new RegExp(`[${chars}]`, 'g'),
    '\\$&',
);
