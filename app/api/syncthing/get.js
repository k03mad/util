import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {syncthing} = env;

/**
 * @param {string} path
 * @returns {Promise<object>}
 */
export default async path => {
    const {body} = await got(`http://${syncthing.ip}:${syncthing.port}/rest/${path}`, {
        headers: {
            'X-API-Key': syncthing.key,
        },
    });

    return body;
};
