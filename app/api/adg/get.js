import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {adg} = env;

/**
 * @param {string} path
 * @returns {Promise<object>}
 */
export default async path => {
    const {body} = await got(`https://api.adguard-dns.io/api/v1/${path}`, {
        headers: {
            authorization: adg.token,
        },
    });

    return body;
};
