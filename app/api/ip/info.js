import env from '../../../env.js';
import gotCache from '../../utils/request/cache.js';

const {ipinfo} = env;

/**
 * @param {string} ip
 * @returns {Promise<object>}
 */
export default async ip => {
    const url = `https://ipinfo.io/${ip}`;
    const tokenParams = {searchParams: {token: ipinfo.token}};
    const cacheParams = {expire: '30d'};

    let body;

    try {
        ({body} = await gotCache(url, tokenParams, cacheParams));
    } catch (err) {
        try {
            ({body} = await gotCache(url, cacheParams));
        } catch {
            throw err;
        }
    }

    return body;
};
