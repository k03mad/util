import env from '../../../env.js';

const {mikrotik} = env;

export default {
    username: mikrotik.user,
    password: mikrotik.password,
    https: {
        rejectUnauthorized: false,
    },
};
