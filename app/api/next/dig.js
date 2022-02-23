import env from '../../../env.js';
import doh from '../../utils/request/doh.js';

/**
 * @param {string} domain
 * @returns {Promise<object>}
 */
export default domain => doh({
    domain,
    resolver: `https://dns.nextdns.io/${env.next.config}/Mad-Checker`,
    expire: '1s',
});
