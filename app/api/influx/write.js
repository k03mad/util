import chalk from 'chalk';
import _ from 'lodash';
import now from 'nano-time';
import util from 'node:util';

import env from '../../../env.js';
import convert from '../../utils/array/convert.js';
import delay from '../../utils/promise/delay.js';
import got from '../../utils/request/got.js';
import escape from '../../utils/string/escape.js';

const {magenta} = chalk;
const {cloud, influx} = env;

/**
 * @param {object} data
 * @returns {Promise}
 */
export default async data => {
    const TRIES = 3;

    const errors = [];

    await Promise.all(convert(data).map(async ({url = influx.url, db = influx.db, meas, values, timestamp = now()}) => {
        try {
            const writeData = Object.entries(values).map(([key, prop]) => {
                if (key === 'undefined') {
                    throw new Error([
                        `InfluxDB "${db}" measurement write error:`,
                        `name = ${key}`,
                        `value = ${prop}`,
                    ].join('\n'));
                }

                return [
                    escape(key, ', '),
                    typeof prop === 'string' ? `"${escape(prop, '"').trim()}"` : prop,
                ].join('=');
            }).join();

            if (writeData) {
                const path = `${url}/write`;
                const body = `${meas} ${writeData} ${timestamp}`;

                for (let i = 1; i <= TRIES; i++) {
                    try {
                        if (cloud.is) {
                            await got(path, {method: 'POST', searchParams: {db}, body});
                        } else {
                            // eslint-disable-next-line no-console
                            console.log(util.formatWithOptions({colors: true}, `${magenta(meas)}\n%O\n`, values));
                        }

                        break;
                    } catch (err) {
                        if (i === TRIES) {
                            throw new Error([
                                `InfluxDB "${db}" write error:`,
                                path,
                                body,
                                err,
                            ].join('\n').trim());
                        } else {
                            await delay(_.random(5000, 10_000));
                        }
                    }
                }
            }
        } catch (err) {
            errors.push(err);
        }
    }));

    if (errors.length > 0) {
        throw new Error(errors.join('\n\n'));
    }
};
