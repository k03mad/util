import gotCache from '../../utils/request/cache.js';
import auth from './auth.js';

/**
 * @param {object} opts
 * @param {string} opts.method
 * @param {object} opts.cred
 * @param {object} opts.params
 * @param {object} opts.gotOpts
 * @returns {Promise<object>}
 */
export default async ({

    method, cred,
    params = {},
    gotOpts = {},

}) => {
    const {login, token, type} = await auth({cred, gotOpts});

    const {body} = await gotCache('https://api.myshows.me/v2/rpc/', {
        method: 'POST',
        headers: {
            authorization: `${type} ${token}`,
        },
        json: {
            id: 1,
            jsonrpc: '2.0',
            params: {login, ...params},
            method,
        },
        ...gotOpts,
    }, {expire: '30m'});

    return body.result;
};
