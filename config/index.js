const dotenv = require('dotenv');
dotenv.config();

const config = {
    'port': process.env['port'] || 3333,
    'OPEN_AI_KEY': process.env['OPEN_AI_KEY'] || null,
}

module.exports = config;

