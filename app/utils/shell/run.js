import debug from 'debug';
import cp from 'node:child_process';
import util from 'node:util';

import convert from '../array/convert.js';

const exec = util.promisify(cp.exec);
const log = debug('util:shell:run');

/**
 * @param {string|Array<string>} cmd
 * @param {object} opts
 * @param {boolean} opts.returnOnErr
 * @returns {Promise<string>}
 */
export default async (cmd, {returnOnErr} = {}) => {
    const maxBuffer = 1024 * 5000;

    const run = convert(cmd).join(' && ');
    log.extend('in')('%o', run);

    let stderr, stdout;

    try {
        ({stderr, stdout} = await exec(run, {maxBuffer, shell: '/bin/bash'}));
    } catch (err) {
        if (returnOnErr) {
            ({stderr, stdout} = err);
        } else {
            throw new Error([
                'Error while trying to execute:',
                `$ ${run}`,
                `# code: ${err?.code}`,
                `# stdout: ${err?.stdout}`,
                `# stderr: ${err?.stderr}`,
            ].join('\n'));
        }
    }

    const output = [stdout, stderr]
        .filter(Boolean)
        .map(elem => elem.trim())
        .join('\n\n');

    log.extend('out')('%o', output);
    return output;
};
