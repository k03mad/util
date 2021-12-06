import moment from 'moment';

/**
 * @param {object} opts
 * @param {object} opts.date
 * @param {string} opts.period
 * @returns {number}
 */
export default ({

    date = moment(),
    period = 'days',

} = {}) => moment().diff(moment(date), period);
