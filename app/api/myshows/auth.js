import env from '../../../env.js';
import gotCache from '../../utils/request/cache.js';

const {myshows} = env;

/**
 * @param {object} opts
 * @param {object} opts.cred
 * @param {object} opts.gotOpts
 * @returns {Promise<object>}
 */
export default async ({

    cred = myshows,
    gotOpts = {},

} = {}) => {
    const {client, login, password, secret} = cred;

    const {body} = await gotCache('https://myshows.me/oauth/token', {
        method: 'POST',
        json: {
            grant_type: 'password',
            client_id: client,
            client_secret: secret,
            username: login,
            password,
        },
        ...gotOpts,
    }, {expire: '1d'});

    return {token: body.access_token, type: body.token_type, login};
};
