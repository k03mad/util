import env from '../../../env.js';
import got from '../../utils/request/got.js';
import opts from './_opts.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @param {object} json
 * @returns {object}
 */
export default async (path, json) => {
    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {
        ...opts,
        method: 'POST', json,
    });

    return body;
};
