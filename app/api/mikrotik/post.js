import _ from 'lodash';

import env from '../../../env.js';
import delay from '../../utils/promise/delay.js';
import got from '../../utils/request/got.js';

const {mikrotik} = env;

const request = async (path, json, gotOpts) => {
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

/**
 * @param {string} path
 * @param {object} json
 * @param {object} gotOpts
 * @returns {Promise<object>}
 */
export default async (path, json, gotOpts) => {
    const args = [path, json, gotOpts];

    try {
        return await request(...args);
    } catch (err) {
        if (err.response?.statusCode === 200) {
            await delay(_.random(1000, 5000));
            return request(...args);
        }

        throw err;
    }
};
