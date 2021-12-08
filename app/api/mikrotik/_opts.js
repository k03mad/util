import env from '../../../env.js';

const {mikrotik} = env;

/**
 * @param {string} path
 * @returns {string}
 */
export const sanitize = path => path.replace(/^\/|\/$/g, '');

export const defOpts = {
    username: mikrotik.user,
    password: mikrotik.password,
    https: {
        rejectUnauthorized: false,
    },
};
