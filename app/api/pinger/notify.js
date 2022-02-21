import env from '../../../env.js';
import sendMessage from '../telegram/sendMessage.js';

const {pinger} = env;

/**
 * @param {object} opts
 * @param {string} token
 * @returns {Promise}
 */
export default (opts, token = pinger.tg) => sendMessage(opts, token);
