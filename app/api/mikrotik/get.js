import env from '../../../env.js';
import got from '../../utils/request/got.js';
import opts from './_opts.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @returns {object}
 */
export default async path => {
    path = path.replace(/^\/|\/$/g, '');

    const {body} = await got(`https://${mikrotik.host}/rest/${path}`, {...opts});
    return body;
};
