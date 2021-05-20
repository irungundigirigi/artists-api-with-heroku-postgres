const express = require('express');
const pg = require('pg');
const cors = require('cors');
require("dotenv").config();

const app = express();

//load middleware
app.use(cors());
app.use(express.json())

let port = process.env.PORT

//connect database
const Pool = require('pg').Pool;



let Password = process.env.DB_PASSWORD;

const pool = new Pool ({
    user: "postgres",
    password:Password,
    database:"artists_db",
    host:"localhost",
    port: 5432
});
pool.connect();


app.post("/api/artists",async(req,res)=> {
    try{
        const {first_name, last_name, stage_name,sex,date_of_birth, email,genre,records_sold,active,id_no} = req.body;
        const newArtist = await pool.query(
            "INSERT INTO artists (first_name, last_name, stage_name,sex,date_of_birth, email,genre,records_sold,active,id_no) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
            [first_name, last_name, stage_name,sex,date_of_birth, email,genre,records_sold,active,id_no]
        );
        res.json(newArtist.rows[0]);
    }catch(err){
        console.log(err.message )
    }
});

//GET  TODOs
app.get("/api/artists",async(req,res) => {
    try{
        const allArtists = await pool.query("SELECT * FROM artists");
        res.json(allArtists.rows);    

    }catch(err){
        console.error(err.message);

    }
});


app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`)
} )



