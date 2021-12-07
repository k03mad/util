import switch_ from './api/mikrotik/switch.js';
import write from './api/mikrotik/write.js';
import auth from './api/next/auth.js';
import list from './api/next/list.js';
import query from './api/next/query.js';
import ua from './const/ua.js';
import diffArray from './utils/array/diff.js';
import diff from './utils/date/diff.js';
import now from './utils/date/now.js';
import comment from './utils/hosts/comment.js';
import sort from './utils/hosts/sort.js';
import count from './utils/object/count.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';
import cache from './utils/request/cache.js';
import curl from './utils/request/curl.js';
import doh from './utils/request/doh.js';
import got from './utils/request/got.js';
import queue from './utils/request/queue.js';
import save from './utils/request/save.js';

export default {

    /**
     * API
     */
    mikrotik: {switch: switch_, write},
    next: {auth, query, list},

    /**
     * CONST
     */
    ua,

    /**
     * UTILS
     */
    array: {diff: diffArray},
    date: {diff, now},
    hosts: {comment, sort},
    object: {count},
    print: {ex},
    promise: {delay},
    request: {doh, got, curl, cache, queue, save},

};
