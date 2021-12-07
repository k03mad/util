import now from 'nano-time';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import env from '../../../env.js';

/**
 * @param {object} response
 */
export default async response => {
    if (
        env.influx.request
        && env.influx.db
        && env.influx.url
    ) {
        response = response.response || response;

        if (response?.requestUrl?.toString()) {
            const parsed = new URL(response.requestUrl.toString());

            if (!parsed.href.startsWith(env.influx.url)) {
                const date = now();

                const data = {
                    statusCode: response?.statusCode,
                    method: response?.req?.method,
                    domain: parsed.hostname,
                    timing: response?.timings?.phases?.total,
                    // eslint-disable-next-line no-underscore-dangle
                    port: response?.socket?._peername?.port,
                    date,
                };

                const cacheFile = path.join(
                    os.tmpdir(),
                    '_req_stats',
                    `${date}.json`,
                );

                await fs.mkdir(path.dirname(cacheFile), {recursive: true});
                await fs.writeFile(cacheFile, JSON.stringify(data));
            }
        }
    }
};
