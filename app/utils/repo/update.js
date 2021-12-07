import run from '../shell/run.js';

/**
 * @param {string} repo
 * @returns {Promise<string>}
 */
export default repo => run([
    `cd ~/git/${repo}`,
    'git reset --hard',
    'git pull',
    'npm run setup',
]);
