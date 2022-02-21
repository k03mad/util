import chalk from 'chalk';
import debug from 'debug';
import hasha from 'hasha';
import moment from 'moment';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {compress, decompress} from 'shrink-string';

import diff from '../date/diff.js';
import got from './got.js';
import getQueue from './queue.js';

const log = debug('utils-mad:request:cache');
const {blue, cyan, dim, green, red, yellow} = chalk;

/**
 * @param {string} url
 * @param {object} gotOpts
 * @param {object} opts
 * @param {string} opts.expire
 * @returns {Promise<object>}
 */
export default (url, gotOpts = {}, {expire = '7d'} = {}) => {
    const queue = getQueue(new URL(url).host, gotOpts.method);

    return queue.add(async () => {
        const cacheGotResponseKeys = [
            'body',
            'headers',
            'method',
            'statusCode',
            'statusMessage',
            'timings',
        ];

        const cacheFile = path.join(
            os.tmpdir(),
            hasha('').slice(0, 10),
            hasha(process.env.npm_package_name || ''),
            hasha(url),
            hasha(JSON.stringify(gotOpts)),
        );

        await fs.mkdir(path.dirname(cacheFile), {recursive: true});

        try {
            const cache = await fs.readFile(cacheFile, {encoding: 'utf8'});
            const text = await decompress(cache);
            const {cachedResponse, date} = JSON.parse(text);

            const match = {
                w: 'weeks',
                d: 'days',
                h: 'hours',
                m: 'minutes',
                s: 'seconds',
            };

            const count = Number(expire.replace(/\D/, ''));
            const char = expire.replace(/\d/g, '');
            const measurement = match[char];

            const currentDiff = diff({date, period: measurement});

            if (currentDiff < count) {
                log(`${green('OK')} :: ${currentDiff}/${count} ${measurement} left :: ${blue(url)}\n${blue(dim(cacheFile))}`);
                return cachedResponse;
            }

            log(`${red('EXPIRED')} :: ${currentDiff}/${count} ${measurement} left :: ${blue(url)}\n${blue(dim(cacheFile))}`);
        } catch (err) {
            if (err.code === 'ENOENT') {
                log(`${yellow('NOT FOUND')} :: ${blue(url)}`);
            } else {
                log(`${red('ERROR')} :: ${dim(err)} :: ${blue(url)}\n${blue(dim(cacheFile))}`);
            }
        }

        const res = await got(url, gotOpts, {skipQueue: true});

        const cachedResponse = {};

        cacheGotResponseKeys.forEach(key => {
            cachedResponse[key] = res[key];
        });

        const compressed = await compress(JSON.stringify({date: moment(), cachedResponse}));
        await fs.writeFile(cacheFile, compressed);
        log(`${cyan('SAVED')} :: ${blue(dim(cacheFile))}`);

        return res;
    });
};
