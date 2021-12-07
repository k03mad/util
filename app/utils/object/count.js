/**
 * @param {object} obj
 * @param {string} key
 * @param {string|number} count
 */
export default (obj, key, count = 1) => {
    obj[key] = obj[key] ? obj[key] + Number(count) : Number(count);
};
