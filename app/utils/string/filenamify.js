import filenamify from 'filenamify';

/**
 * @param {string} str
 * @returns {string}
 */
export default str => filenamify(str, {replacement: '_'}).replace(/_+/g, '_');
