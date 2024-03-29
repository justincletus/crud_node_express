const utils = require('../utils');

const register = async ({sql, getConnection}) => {
    const sqlQueries = await utils.loadSqlQueries('events');

    const getEvents = async userId => {
        const cnx = await getConnection();
        const request = await cnx.request();
        request.input('userId', sql.VarChar(50), userId)

        return request.query(sqlQueries.getEvents);

    };

    const addEvent = async ({userId, title, description, startDate, endDate, endTime}) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("userId", sql.VarChar(50), userId);
        request.input("title", sql.NVarChar(200), title);
        request.input("description", sql.NVarChar(1000), description);
        request.input("startDate", sql.Date, startDate);
        request.input("endDate", sql.Date, endDate);
        request.input("endTime", sql.Time, endTime);

        return request.query(sqlQueries.addEvent)
    }

    return {
        getEvents,
        addEvent
    }
}

module.exports = {
    register
}
