const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env';

    return {
        resolve: {
            fallback: {

            }
        },
        plugins: [
            new Dotenv({
                path: envPath
            })
        ]
    };
};
