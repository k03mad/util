import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @returns {object}
 */
export default async path => {
    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {
        username: mikrotik.user,
        password: mikrotik.password,
        https: {
            rejectUnauthorized: false,
        },
    });

    return body;
};
