import debug from 'debug';
import got from 'got';

import ua from '../../const/ua.js';
import curl from './curl.js';
import getQueue from './queue.js';
import save from './save.js';

const log = debug('util:request:got');

/**
 * @param {string} url
 * @param {object} opts
 * @returns {Promise<object>}
 */
const request = async (url, opts) => {
    opts = {...opts};

    if (!opts.timeout) {
        opts.timeout = {request: 15_000};
    }

    if (!opts.headers) {
        opts.headers = {'user-agent': ua.tools.curl};
    } else if (!opts.headers['user-agent']) {
        opts.headers['user-agent'] = ua.tools.curl;
    }

    try {
        const response = await got(url, opts);
        await save(response);

        if (!opts.responseType) {
            try {
                response.body = JSON.parse(response.body);
            } catch {}
        }

        log(curl(url, opts, response));
        return response;
    } catch (err) {
        await save(err);

        log(curl(url, opts, err));
        throw err;
    }
};

/**
 * @param {string} url
 * @param {object} opts
 * @param {object} params
 * @param {boolean} params.skipQueue
 * @returns {Promise<object>}
 */
export default (url, opts = {}, {skipQueue} = {}) => {
    if (skipQueue) {
        return request(url, opts);
    }

    const queue = getQueue(new URL(url).host, opts.method);
    return queue.add(() => request(url, opts));
};
