const selectTable = (tablename) => {
    return `select * from [dbo].[${tablename}]`;
}

const insertEventTable = (title, description, start_date, end_date, end_time) => {
    return `insert into events(title, description, start_date, end_date, end_time) values(${title}, ${description}, ${start_date}, ${end_date}, ${end_time})`;
}

const insertUserTable = (userId, username, email, password, start_date, update_at, status, email_confirm) => {
    return `insert into users(userId, username, email, password, start_date, update_at, status, email_confirm) values('${userId}', '${username}', '${email}', '${password}', '${start_date}', '${update_at}', ${status}, ${email_confirm})`;
}

const selectUser = (email) => {
    return `select id, userId, username, email, password, start_date, status from [dbo].[users] where email='${email}'`;
}

module.exports = {
    selectTable,
    insertEventTable,
    insertUserTable,
    selectUser
}
