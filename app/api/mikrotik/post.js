import env from '../../../env.js';
import got from '../../utils/request/got.js';
import defOpts from './_opts.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @param {object} json
 * @param {object} gotOpts
 * @returns {object}
 */
export default async (path, json, gotOpts) => {
    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {
        ...defOpts,
        method: 'POST', json,
        ...gotOpts,
    });

    return body;
};
