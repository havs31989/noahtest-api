export default () => {
    const config = {
        version: process.env.VERSION,
        port: parseInt(process.env.PORT, 10) || 3000
    };
    return config;
};