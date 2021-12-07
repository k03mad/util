import env from '../../../env.js';
import sendMessage from '../telegram/sendMessage.js';

const {pinger} = env;

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
export default (opts, token = pinger.tg) => sendMessage(opts, token);
