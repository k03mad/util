import debug from 'debug';

const log = debug('utils-mad:promise:delay');

/**
 * @param {number} time
 * @returns {Promise}
 */
export default (time = 1000) => {
    log(time);
    return new Promise(resolve => setTimeout(resolve, time));
};
