import chalk from 'chalk';
import cliProgress from 'cli-progress';

const {blue, gray, green} = chalk;

/**
 * @param {string} name
 * @returns {object}
 */
export default name => {
    const options = {
        format: `${blue(name)} ${green('[{bar}]')} {value}/{total} ${gray('{extra}')}`,
        hideCursor: true,
        stopOnComplete: true,
        autopadding: true,
        barCompleteChar: '#',
        barIncompleteChar: '.',
    };

    return new cliProgress.SingleBar(options);
};
