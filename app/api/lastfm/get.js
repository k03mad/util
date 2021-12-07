import env from '../../../env.js';
import got from '../../utils/request/got.js';

/**
 * @param {object} params
 * @returns {object}
 */
export default async (params = {}) => {
    const {body} = await got('https://ws.audioscrobbler.com/2.0/', {
        searchParams: {
            api_key: env.lastfm.key,
            format: 'json',
            ...params,
        },
    });

    return body;
};
