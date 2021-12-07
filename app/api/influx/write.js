import now from 'nano-time';

import env from '../../../env.js';
import convert from '../../utils/array/convert.js';
import delay from '../../utils/promise/delay.js';
import got from '../../utils/request/got.js';
import escape from '../../utils/string/escape.js';

const {influx} = env;

/**
 * @param {object} data
 */
export default async data => {
    const tries = {
        count: 3,
        delay: 10_000,
    };

    const errors = [];

    await Promise.all(convert(data).map(async ({url = influx.url, db = influx.db, meas, values, timestamp = now()}) => {
        try {
            const writeData = Object.entries(values).map(elem => {
                const [key, prop] = elem;
                return [
                    escape(key, ', '),
                    typeof prop === 'string' ? `"${escape(prop, '"').trim()}"` : prop,
                ].join('=');
            }).join();

            if (writeData) {
                const path = `${url}/write`;
                const body = `${meas} ${writeData} ${timestamp}`;

                for (let i = 1; i <= tries.count; i++) {
                    try {
                        await got(path, {method: 'POST', searchParams: {db}, body});
                        break;
                    } catch (err) {
                        if (i === tries.count) {
                            throw new Error([`InfluxDB "${db}" write error:`, path, body, err].join('\n').trim());
                        } else {
                            await delay(tries.delay);
                        }
                    }
                }
            }
        } catch (err) {
            errors.push(err);
        }
    }));

    if (errors.length > 0) {
        throw errors.join('\n\n');
    }
};
