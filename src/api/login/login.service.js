const dbClient = require('../../data/index');
const {selectUser} = require('../../data/events/sqlQuery');
const {verifyPassword} = require('../../data/utils');
const config = require('../../config/config')
const jwt = require('jsonwebtoken');

const {cookiePwd} = config;

const login = async (req, res, next) => {
    let payload = req.body;
    let email, password;
    let user;
    let user_valid=false;
    let select_user="";
    email = payload.email?payload.email:"";
    password = payload.password?payload.password:"";
    if (email !== "" && password !== "") {
        const pool = await dbClient();
        select_user = selectUser(email)
        await pool.request().query(select_user).then(result => {
            user = result.recordset[0]? result.recordset[0]: null
            if(!user) {
                return res.json({message: "user not found"});
            }

        }).catch(err => {
            return res.json({mes: `Error in getting user ${err}`});
        })
        if(user) {
            user_valid = await verifyPassword(password, user.password);
            if (user_valid) {
                let secretKey = cookiePwd;
                const token = jwt.sign({id: user.id}, secretKey, {
                    expiresIn: 86400 //24 hours valid
                } )

                return res.status(200).send({auth: true, access_token: token});
            } else {
                return res.json({message: "login failed"});
            }
        }

    } else {
        return res.json({message: "missing required field of email or password"})
    }
}

module.exports = {
    login
}
