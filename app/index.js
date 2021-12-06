import now from './utils/date/now.js';
import ex from './utils/print/ex.js';
import delay from './utils/promise/delay.js';

const util = {
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
