import sort from './sort.js';

/**
 * @param {Array|Set} domains
 * @param {object} opts
 * @param {string} opts.comment
 * @param {string} opts.separator
 * @param {number} opts.pad
 * @returns {Array}
 */
export default (
    domains, {comment = '! ', pad = 30, separator = '—'} = {},
) => sort(domains)
    .reverse()
    .map((elem, i, arr) => {
        const currentDomain = elem.split('.').pop();
        const nextElem = arr[i + 1] ? arr[i + 1] : '';
        const nextDomain = nextElem ? nextElem.split('.').pop() : '';

        // eslint-disable-next-line no-mixed-operators
        if (nextElem && currentDomain !== nextDomain || i === arr.length - 1) {
            return [
                comment,
                `${comment}${separator + separator} ${currentDomain.replace(/\^.*/, '')} `.padEnd(pad, separator),
                comment,
                elem,
            ].join('\n');
        }

        return elem;
    })
    .reverse()
    .join('\n');
