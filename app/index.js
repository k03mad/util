import switch_ from './api/mikrotik/switch.js';
import write from './api/mikrotik/write.js';
import now from './utils/date/now.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';

const util = {
    // api
    mikrotik: {
        switch: switch_,
        write,
    },

    // utils
    date: {
        now,
    },

    print: {
        ex,
    },

    promise: {
        delay,
    },

};

export default util;
