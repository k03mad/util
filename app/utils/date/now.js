import moment from 'moment';

/**
 * @param {string} format
 * @returns {string}
 */
export default (format = 'DD.MM.YYYY HH:mm:ss') => moment().format(format);
