export default {
    influx: {
        url: process.env.INFLUX_URL,
        db: process.env.INFLUX_DB,
        request: process.env.INFLUX_STORE_REQUEST_STATS,
        ipPort: process.env.INFLUX_IP_PORT,
    },
    mikrotik: {
        host: process.env.MIKROTIK_HOST,
        user: process.env.MIKROTIK_USER,
        password: process.env.MIKROTIK_PASSWORD,
    },
    google: {
        email: process.env.GOOGLE_EMAIL,
    },
    next: {
        password: process.env.NEXT_DNS_PASSWORD,
        config: process.env.NEXT_DNS_CONFIG,
    },
};
