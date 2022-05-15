import convert from '../../utils/array/convert.js';
import query from './query.js';
import write from './write.js';

/**
 * @param {object} append
 * @returns {Promise}
 */
export default append => Promise.all(convert(append).map(async data => {
    const measOriginal = data.meas;
    const valuesOriginal = {...data.values};

    const measAppend = `${data.meas}_append`;
    const valuesAppend = {...data.values};

    const valuesMax = {};
    const measMax = `${data.meas}_max`;

    await Promise.all(Object.entries(valuesOriginal).map(async ([key, value]) => {
        const queries = [
            `SELECT last("${key}") FROM "${measOriginal}"`,
            `SELECT last("${key}") FROM "${measMax}"`,
        ];

        const [original, max] = await Promise.all(queries.map(async q => {
            const {results} = await query({...data, q});
            return results[0].series?.[0]?.values?.[0]?.[1] || 0;
        }));

        if (value < original) {
            valuesMax[key] = original + max;
        }

        valuesAppend[key] = value + (valuesMax[key] || max);
    }));

    await write([
        {meas: measOriginal, values: valuesOriginal},
        {meas: measAppend, values: valuesAppend},
        {meas: measMax, values: valuesMax},
    ].map(elem => ({...data, ...elem})));
}));
