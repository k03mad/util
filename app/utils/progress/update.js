/**
 * @param {object} bar
 * @param {number} length
 * @param {string} extra
 */
export default (bar, length, extra = '') => {
    bar.update(length, {extra});
};
