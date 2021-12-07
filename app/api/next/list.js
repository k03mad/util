import env from '../../../env.js';
import query from './query.js';

const {google, next} = env;

/**
 * @param {object} opts
 * @param {string} opts.path
 * @param {string} [opts.email]
 * @param {string} [opts.password]
 * @param {string} [opts.config]
 * @returns {Array}
 */
export default async ({
    path,
    email = google.email,
    password = next.password,
    config = next.config,
} = {}) => {
    const list = await query({path, email, password, config});
    return list.map(({domain}) => domain);
};
