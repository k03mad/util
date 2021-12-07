import env from '../../../env.js';
import sendMessage from '../telegram/sendMessage.js';

const {cloud} = env;

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
export default (opts, token = cloud.tg) => sendMessage(opts, token);
