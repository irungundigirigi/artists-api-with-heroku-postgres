//connect database
const pg = require('pg');
const Pool = require('pg').Pool;



let Password = process.env.DB_PASSWORD;

const pool = new Pool ({
    user: "postgres",
    password:Password,
    database:"artists_db",
    host:"localhost",
    port: 5432
});



module.exports= pool;