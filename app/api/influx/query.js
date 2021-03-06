import env from '../../../env.js';
import got from '../../utils/request/got.js';

const {influx} = env;

/**
 * @param {object} opts
 * @param {string} opts.url
 * @param {string} opts.db
 * @param {string} opts.q
 * @returns {Promise<object>}
 */
export default async ({url = influx.url, db = influx.db, q}) => {
    const path = `${url}/query`;

    try {
        const {body} = await got(path, {searchParams: {db, q}});
        return body;
    } catch (err) {
        throw new Error([`InfluxDB "${db}" read error:`, path, q, err].join('\n').trim());
    }
};
