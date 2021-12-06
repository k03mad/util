import switch_ from './api/mikrotik/switch.js';
import write from './api/mikrotik/write.js';
import ua from './const/ua.js';
import diff from './utils/date/diff.js';
import now from './utils/date/now.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';
import cache from './utils/request/cache.js';
import curl from './utils/request/curl.js';
import got from './utils/request/got.js';
import queue from './utils/request/queue.js';
import save from './utils/request/save.js';

export default {

    /**
     * API
     */
    mikrotik: {switch: switch_, write},

    /**
     * CONST
     */
    ua,

    /**
     * UTILS
     */
    date: {diff, now},
    print: {ex},
    promise: {delay},
    request: {got, curl, cache, queue, save},

};
