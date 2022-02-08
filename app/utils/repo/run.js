import convert from '../array/convert.js';
import run from '../shell/run.js';
import update from './update.js';

/**
 * @param {string} repo
 * @param {string|Array<string>}scripts
 * @returns {Promise<string>}
 */
export default async (repo, scripts) => {
    const updateLog = await update(repo);

    const logs = [];

    for (const script of convert(scripts)) {
        const log = await run([
            `cd ~/git/${repo}`,
            `npm run ${script}`,
        ]);

        logs.push(log);
    }

    return `${updateLog}\n${logs.join('\n\n')}`;
};
