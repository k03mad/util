import env from '../../../env.js';
import ua from '../../const/ua.js';
import gotCache from '../../utils/request/cache.js';

const {win} = ua;
const {google, next} = env;

/**
 * @param {object} opts
 * @param {string} opts.email
 * @param {string} opts.password
 * @returns {Array}
 */
export default async ({email = google.email, password = next.password} = {}) => {
    const {body, headers} = await gotCache('https://api.nextdns.io/accounts/@login', {
        method: 'POST',
        json: {email, password},
        headers: {
            'user-agent': win.chrome,
            'origin': 'https://my.nextdns.io',
        },
    }, {expire: '1m'});

    const errors = body?.errors;

    if (errors) {
        throw new Error(JSON.stringify(errors));
    }

    return headers['set-cookie']
        .map(elem => elem.split('; ')[0])
        .join('; ');
};
