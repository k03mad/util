import gotCache from './cache.js';

/**
 * @param {object} opts
 * @param {string} opts.resolver
 * @param {string} opts.domain
 * @param {string} opts.expire
 * @returns {Promise<object>}
 */
export default async ({domain, expire = '7d', resolver = 'https://dns.google/resolve'}) => {
    const {body} = await gotCache(resolver, {
        headers: {accept: 'application/dns-json'},
        searchParams: {name: domain},
    }, {expire});

    return body;
};
