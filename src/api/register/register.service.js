const dbClient =  require('../../data/index');
const {insertUserTable} = require('../../data/events/sqlQuery');
const uuid = require('uuid');
const {hashPassword} = require('../../data/utils');

const createUser = async (req, res, next) => {
    let pool = null;
    try {
        pool = await dbClient()
        let payload, user_email, user_password;
        payload = req.body;
        user_email = payload.email?payload.email:"";
        user_password = payload.password?payload.password:"";
        if(user_email !== "" && user_password !== "") {
            if(String(payload.email).match("@")) {
                username = String(payload.email).split('@')[0];
            }
            const start_date = new Date();
            const formatted_date = start_date.toISOString().slice(0, 19).replace('T', ' ');
            const userId = uuid.v4();
            hashed_pwd = await hashPassword(payload.password);
            let insertUser = insertUserTable(userId, username, payload.email, hashed_pwd, formatted_date, formatted_date, '0', '0')
            
            let user = await pool.request().query(insertUser).then(result => {
                
                console.log(result);

                console.log('user created successfully');
            }).catch(err => {
                console.error(`create user is failed ${err}`);
            })

            return res.json({message: "user is created"});
            
        } else {
            return res.json({message: "missing required value of email or password"});          
        }
        
    } catch (error) {
        return res.json({message: error});
    }
}

module.exports = {
    createUser
}
