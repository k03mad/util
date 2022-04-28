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
        env.cloud.is
        && env.influx.db
        && env.influx.url
    ) {
        const responseObj = response.response || response;
        const urlString = response?.requestUrl?.toString();

        if (urlString) {
            const parsed = new URL(urlString);

            if (!parsed.href.startsWith(env.influx.url)) {
                const date = now();

                const data = {
                    statusCode: responseObj?.statusCode,
                    method: responseObj?.req?.method,
                    domain: parsed.hostname,
                    timing: responseObj?.timings?.phases?.total,
                    // eslint-disable-next-line no-underscore-dangle
                    port: responseObj?.socket?._peername?.port,
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
