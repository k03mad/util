import env from '../../../env.js';
import got from '../../utils/request/got.js';
import defOpts from './_opts.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @param {object} json
 * @param {object} opts
 * @returns {object}
 */
export default async (path, json, opts) => {
    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {
        ...defOpts,
        method: 'POST', json,
        ...opts,
    });

    return body;
};
