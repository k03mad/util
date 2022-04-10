import debug from 'debug';
import fs from 'node:fs';

import convert from '../array/convert.js';

const log = debug('util:folder:erase');

/**
 * @param {string|Array<string>} paths
 * @param {object} opts
 * @param {boolean} opts.sync
 */
export default async (paths, {sync = false} = {}) => {
    const options = {force: true, recursive: true};

    for (const folder of convert(paths)) {
        log(`Erasing folder (sync:${sync}):\n${folder}`);

        if (sync) {
            fs.rmSync(folder, options);
            fs.mkdirSync(folder, options);
            return;
        }

        await fs.promises.rm(folder, options);
        await fs.promises.mkdir(folder, options);
    }
};
