import env from '../../../env.js';
import got from '../../utils/request/got.js';
import {defOpts, sanitize} from './_opts.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @returns {object}
 */
export default async path => {
    const {body} = await got(`https://${mikrotik.host}/rest/${sanitize(path)}`, {...defOpts});
    return body;
};
