import env from '../../../env.js';
import ua from '../../const/ua.js';
import got from '../../utils/request/got.js';
import auth from './auth.js';

const {win} = ua;
const {google, next} = env;

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {string} [opts.email]
 * @param {string} [opts.password]
 * @param {string} [opts.config]
 * @param {object} [opts.rest]
 * @returns {Array}
 */
export default async ({
    path,
    email = google.email,
    password = next.password,
    config = next.config,
    ...rest
} = {}) => {
    const cookie = await auth({email, password});
    const {body} = await got(`https://api.nextdns.io/configurations/${config}/${path}`, {
        headers: {
            'user-agent': win.chrome,
            cookie,
        },
        ...rest,
    });

    return body;
};
