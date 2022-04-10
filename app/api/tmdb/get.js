import qs from 'qs';

import env from '../../../env.js';
import gotCache from '../../utils/request/cache.js';
import got from '../../utils/request/got.js';

const {tmdb} = env;

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {object} opts.params
 * @param {string} opts.key
 * @param {string} opts.language
 * @param {object} opts.gotOpts
 * @param {boolean} opts.cache
 * @param {string} opts.expire
 * @param {string} opts.proxy
 * @returns {Promise<object>}
 */
export default async ({

    path, params = {},
    key = tmdb.key,
    language = 'ru-RU',
    gotOpts = {},
    cache,
    expire,
    proxy = '',

}) => {
    const query = qs.stringify({
        api_key: key,
        language,
        ...params,
    });

    let url = `https://api.themoviedb.org/3/${path}?${query}`;

    if (proxy) {
        url = proxy + encodeURIComponent(url);
    }

    const {body} = cache
        ? await gotCache(url, gotOpts, {expire})
        : await got(url, gotOpts);

    return body.results || body;
};
