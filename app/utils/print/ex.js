import chalk from 'chalk';

import now from '../date/now.js';

const {blue, gray, green, red, yellow} = chalk;

let errors = 0;

/**
 * @param {object} err
 * @param {object} opts
 * @param {boolean} opts.beforeline
 * @param {boolean} opts.afterline
 * @param {boolean} opts.time
 * @param {boolean} opts.full
 * @param {string} opts.after
 * @param {string} opts.before
 * @param {boolean} opts.exit
 * @param {number} opts.exitAfter
 */
export default (err, {

    after,
    afterline = true,
    before,
    beforeline = true, exit, exitAfter,
    full, time = true,

} = {}) => {
    const msg = [];

    if (beforeline) {
        msg.push('');
    }

    if (time) {
        msg.push(green(now()));
    }

    if (before) {
        msg.push(yellow(before));
    }

    if (full) {
        msg.push(err?.stack || err);
    } else {
        msg.push(err.toString());
    }

    let httpErr = '';

    if (err.response?.statusCode) {
        httpErr += `${red(err.response.statusCode)}: `;
    }

    if (err.options?.method) {
        httpErr += `${green(err.options.method)} `;
    }

    if (typeof err.options?.url === 'string') {
        httpErr += blue(err.options.url.replace(/:.+@/, ':*****@'));
    }

    if (err.response?.body) {
        httpErr += `\n${gray(err.response.body)}`;
    }

    if (httpErr) {
        msg.push(httpErr);
    }

    if (after) {
        msg.push(yellow(after));
    }

    if (afterline) {
        msg.push('');
    }

    if (exitAfter) {
        errors++;
        msg.push(`> errors count: ${errors}/${exitAfter}`);

        if (errors > exitAfter) {
            errors = 0;
            exit = true;
        }
    }

    // eslint-disable-next-line no-console
    console.error(msg.join('\n'));

    if (exit) {
        process.exit(1);
    }
};
