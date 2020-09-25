const {credential, dbname, dbpwd} = require('./credential')
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    port: process.env.PORT,
    secret: credential,
    dbpwd: dbpwd,
    dbname: dbname
}