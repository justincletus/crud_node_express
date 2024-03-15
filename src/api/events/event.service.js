const dbClient = require('../../data/index');
const {selectTable, insertEventTable} = require('../../data/events/sqlQuery');

const createEvent = async (req, res, next) => {
    const payload = req.body;
    console.log(payload);    
}

const getEvents = async (req, res, next) => {
    let pool = null
    let data = null;
    try {
        let selectEventTable = selectTable('events');
        try {
            pool = await dbClient()
            await pool.request().query(selectEventTable).then(result => {
                data = result.recordsets[0];
                return res.status(200).send(data);
            }).catch(err => {
                return res.status(400).send({message: err})
            });
            
        } catch (error) {
            console.error(error);        
        }
    } catch (error) {
        return res.status(500).send({message: "internal server error"});     
    }

}

module.exports = {
    createEvent,
    getEvents
}
