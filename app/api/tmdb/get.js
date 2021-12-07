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
 * @returns {Promise<object>}
 */
export default async ({

    path, params = {},
    key = tmdb.key,
    language = 'ru-RU',
    gotOpts = {},
    cache,
    expire,

}) => {
    const request = [
        `https://api.themoviedb.org/3/${path}`, {
            searchParams: {
                api_key: key,
                language,
                ...params,
            },
            ...gotOpts,
        },
    ];

    const {body} = cache
        ? await gotCache(...request, {expire})
        : await got(...request);

    return body.results || body;
};
