import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @param {object} json
 * @param {object} gotOpts
 * @returns {Promise<object>}
 */
export default async (path, json, gotOpts) => {
    path = path.replace(/^\/|\/$/g, '');

    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {
        method: 'POST', json,
        username: mikrotik.user,
        password: mikrotik.password,
        https: {
            rejectUnauthorized: false,
        },
        ...gotOpts,
    });

    return body;
};
