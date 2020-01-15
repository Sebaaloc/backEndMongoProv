const dotenv = require('dotenv');
dotenv.config();

const config = {
    common: {
    database: {
      route: process.env.MONGO_ROUTE,
    },
    port: process.env.PORT    
    }
};

module.exports = config;
