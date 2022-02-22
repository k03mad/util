import chalk from 'chalk';
import cliProgress from 'cli-progress';

const {blue, gray, green} = chalk;

/**
 * @param {string} name
 * @param {number} length
 * @returns {object}
 */
export default (name, length) => {
    const options = {
        format: `${blue(name)} ${green('[{bar}]')} {value}/{total} ${gray('{extra}')}`,
        hideCursor: true,
        stopOnComplete: true,
        autopadding: true,
        barCompleteChar: '#',
        barIncompleteChar: '.',
    };

    const bar = new cliProgress.SingleBar(options);
    bar.start(length, 0, {extra: ''});

    return bar;
};
