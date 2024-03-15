const assert = require('assert');
const dotenv = require('dotenv')
dotenv.config()

const {
    PORT,
    HOST,
    HOST_URL,
    COOKIE_ENCRYPT_PWD,
    SQL_SERVER,
    SQL_PORT,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    OKTA_ORG_URL,
    OKTA_CLIENT_ID,
    OKTA_CLIENT_SECRET
} = process.env

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(HOST, "host is required");
assert(PORT, "port is required");
assert(HOST_URL, "host url is required");
assert(COOKIE_ENCRYPT_PWD, "cookie encrypt password is required");
assert(SQL_SERVER, "sql server is required");
assert(SQL_PORT, "sql port is required");
assert(SQL_DATABASE, "sql database is required");
assert(SQL_USER, "sql user is required");
assert(SQL_PASSWORD, "sql password is required")

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    cookiePwd: COOKIE_ENCRYPT_PWD,
    sql: {
        server: SQL_SERVER,
        port: Number(SQL_PORT),
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        dialect: 'mssql',
        options: {
            encrypt: sqlEncrypt
        },
        dialectOptions: {
            instanceName: "SQLEXPRESS"
        }
    },
    okta: {
        url: OKTA_ORG_URL,
        clientId: OKTA_CLIENT_ID,
        clientSecret: OKTA_CLIENT_SECRET
    }
}
