export default {
    adg: {
        token: process.env.ADG_DNS_TOKEN,
    },
    cloud: {
        tg: process.env.TELEGRAM_CLOUD_TOKEN,
        is: process.env.IS_CLOUD,
    },
    influx: {
        url: process.env.INFLUX_URL,
        db: process.env.INFLUX_DB,
        ipPort: process.env.INFLUX_IP_PORT,
    },
    ipinfo: {
        token: process.env.IPINFO_TOKEN,
    },
    lastfm: {
        key: process.env.LASTFM_KEY,
    },
    mikrotik: {
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
    },
    myshows: {
        client: process.env.MYSHOWS_CLIENT,
        secret: process.env.MYSHOWS_SECRET,
        login: process.env.MYSHOWS_LOGIN,
        password: process.env.MYSHOWS_PASSWORD,
    },
    tinkoff: {
        token: process.env.TOAT,
        tg: process.env.TELEGRAM_TINKOFF_BOT,
    },
    pinger: {
        tg: process.env.TELEGRAM_PINGER_BOT,
    },
    telegram: {
        me: process.env.TELEGRAM_MY_CHAT,
    },
};
