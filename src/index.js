require('rootpath')();
const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();
var corsOptions = {
    origin: "http://127.0.0.1:3000"
}
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// app.use("/", (req, res) => {
//     res.json({message: "Hello World!.."})
// })

app.use('/', require('./api/home/home.controller'));
app.use("/api/events",  require("./api/events/event.controller"));
app.use("/api/register", require('./api/register/register.controller'));
app.use("/api/login", require('./api/login/login.controller'));

const {port, host} = config;

app.listen(port, () => {
    console.log("Application is running on port:", port)
})
