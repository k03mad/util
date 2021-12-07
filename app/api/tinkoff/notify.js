import env from '../../../env.js';
import sendMessage from '../telegram/sendMessage.js';

const {tinkoff} = env;

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
export default (opts, token = tinkoff.tg) => sendMessage(opts, token);
