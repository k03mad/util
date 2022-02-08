import ms from 'ms';
import fs from 'node:fs/promises';
import path from 'node:path';
import {tcpPingPort} from 'tcp-ping-port';

import convert from '../../utils/array/convert.js';
import diff from '../../utils/date/diff.js';
import delay from '../../utils/promise/delay.js';
import filenamify from '../../utils/string/filenamify.js';
import notify from './notify.js';

const getFileFullPath = (folder, ping) => {
    const fileName = filenamify(`${ping.host}:${ping.port}`);
    const fileExt = '.json';

    return path.join(folder, fileName + fileExt);
};

/**
 * @param {object | Array<object>} checks
 * @param {string} checks.domain
 * @param {string|number} [checks.port]
 * @param {object} [opts]
 * @param {string} [opts.folder]
 * @param {string} [opts.token]
 */
export default async (checks, {
    folder = './.pinger',
    token,
} = {}) => {
    await fs.mkdir(folder, {recursive: true});
    await fs.writeFile(path.join(folder, '.gitignore'), '*');

    for (const {domain, port = 80} of convert(checks)) {
        let ping = await tcpPingPort(domain, Number(port));

        // one retry
        if (!ping.online) {
            await delay();
            ping = await tcpPingPort(domain, Number(port));
        }

        let previousCheck;

        try {
            const savedData = await fs.readFile(getFileFullPath(folder, ping));
            previousCheck = JSON.parse(savedData);
        } catch {}

        if (previousCheck?.online !== ping.online) {
            const status = ping.online ? 'UP' : 'DOWN';

            const text = [
                `\`${status}\` `,
                ping.host,
                ping.port ? `:${ping.port}` : '',
                ping.ip ? ` (${ping.ip})` : '',
            ];

            if (previousCheck) {
                const prettyDiff = ms(diff({date: previousCheck.time, period: 'milliseconds'}));
                text.push(`\n_${prettyDiff} since the previous status_`);
            }

            await notify({text: text.filter(Boolean).join('')}, token);

            await fs.writeFile(
                getFileFullPath(folder, ping),
                JSON.stringify({...ping, time: Date.now()}),
            );
        }
    }
};
