import debug from 'debug';
import {RouterOSAPI} from 'node-routeros';

import env from '../../../env.js';
import delay from '../../utils/promise/delay.js';

const {mikrotik} = env;
const log = debug('utils-mad:mikrotik:write');

/**
 * @param {string|Array} cmd
 * @param {object} router
 * @returns {Promise<Array>}
 */
export default async (cmd, router = mikrotik) => {
    const tries = 3;

    let client, error, res;

    try {
        const api = new RouterOSAPI(router);
        client = await api.connect();

        const response = [];
        const send = [];

        if (typeof cmd === 'string') {
            send.push([cmd]);
        } else if (Array.isArray(cmd) && typeof cmd[0] === 'string') {
            send.push(cmd);
        } else if (Array.isArray(cmd) && Array.isArray(cmd[0])) {
            send.push(...cmd);
        }

        for (const elem of send) {
            for (let i = 1; i <= tries; i++) {
                try {
                    log('%o', elem);
                    const data = await client.write(elem);
                    response.push(data);
                    break;
                } catch (err) {
                    if (i === tries) {
                        throw err;
                    } else {
                        await delay();
                    }
                }
            }
        }

        res = response;
    } catch (err) {
        error = err;
    }

    try {
        await client.close();
    } catch {}

    if (res) {
        if (res.length === 1) {
            return res.flat();
        }

        return res;
    }

    throw error;
};
