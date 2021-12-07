import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {telegram} = env;

/**
 * @param {object} opts
 * @param {string} token
 * @returns {object}
 */
export default (opts, token) => got(
    `https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        json: {
            chat_id: telegram.me,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            ...opts,
        },
    },
);
