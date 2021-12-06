import switch_ from './api/mikrotik/switch.js';
import write from './api/mikrotik/write.js';
import now from './utils/date/now.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';

export default {

    /**
     * API
     */
    mikrotik: {switch: switch_, write},

    /**
     * UTILS
     */
    date: {now},
    print: {ex},
    promise: {delay},

};
