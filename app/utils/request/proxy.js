import debug from 'debug';

import userAgent from '../../const/ua.js';
import got from './got.js';

const log = debug('util:request:proxy');

/**
 * @param {object} opts
 * @param {string} opts.testUrl
 * @param {number} opts.timeout
 * @param {string} opts.path
 * @param {string} opts.ua
 * @param {boolean} opts.serial
 * @returns {Array}
 */
export default async ({

    testUrl = 'ya.ru',
    timeout = {request: 5000},
    path = 'index.php?hl=144&q=',
    ua = userAgent.win.chrome,
    serial,

} = {}) => {

    const req = async proxy => {
        const proxyFull = proxy + path;
        const proxyTest = proxyFull + testUrl;

        await got(proxyTest, {headers: {'user-agent': ua}, timeout});
        return proxyFull;
    };

    // http://free-proxy.cz/en/web-proxylist/main/uptime/1
    const phpProxyList = [
        'https://www.gauvreau.fr/',
        'https://www.mostafahamed.com/logs2/',
        'https://rhythmusic.net/De1337/nothing/',

        'http://fgks.org/proxy/',
        'http://www.hell-man.de/proxy/',
    ];

    let result;

    if (serial) {
        for (const proxy of phpProxyList) {
            try {
                return await req(proxy);
            } catch {}
        }
    } else {
        result = await Promise.race(phpProxyList.map(async proxy => {
            try {
                return await req(proxy);
            } catch {}
        }));
    }

    if (!result) {
        throw new Error('No working web proxy found');
    }

    log(`proxy found: ${result}`);
    return result;
};
