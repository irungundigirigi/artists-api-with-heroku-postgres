const express = require('express');

const app = express();
const cors = require('cors');
require("dotenv").config();
const apiroutes = require('./routes/router');


let PORT = process.env.PORT
let Password = process.env.DB_PASSWORD;





//load middleware
app.use(cors());
app.use(express.json());
app.use('/', apiroutes)







//pool.connect()

app.listen(PORT, ()=>{
    console.log(`App is running at http://localhost:${PORT}`)
})




