const dotenv = require('dotenv');
dotenv.config();

const dbCredentials = {
    'username': encodeURIComponent('smartPlanAdmin'),
    'password': encodeURIComponent('SrHr1aP7WRmdOVJx')
};

const config = {
    'dbConnectionString': process.env['dbConnectionString'] || `mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@smartplan.kticmii.mongodb.net/`,
    'port': process.env['port'] || 3333,
    'SECRET': process.env['SECRET'] || '2a2e13724ac9764654700bee56f4185c181ebe61',
    'OPEN_AI_KEY': process.env['OPEN_AI_KEY'] || null,
}

module.exports = config;

