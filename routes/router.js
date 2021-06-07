const router = require('express').Router();
const pg = require('pg');
const {Pool} = require('pg');
//let Password = process.env.DB_PASSWORD;
require('dotenv').config()

//const {Pool} = require('pg')
//const isProduction = process.env.NODE_ENV === 'production'

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl: config.ENV === 'production' && {
      rejectUnauthorized: false,
  }
})
pool.connect() 



//CREATE AN ARTIST
router.post("/artists",async(req,res)=> {
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

//GET ARTISTS
router.get("/api/artists",async(req,res) => {
    try{
        const allArtists = await pool.query("SELECT * FROM artists");
        res.json(allArtists.rows);    

    }catch(err){
        console.error(err.message);

    }
});
//API test
router.get("/",async(req,res) => {
    res.send('API is live!')

});

//GET AN ARTIST
router.get("/api/artists/:id_no",async(req,res) => {
    const{id_no} = req.params
    try{
        const Artist = await pool.query("SELECT * FROM artists WHERE id_no = $1", [id_no]);
        res.json(Artist.rows[0]);    

    }catch(err){
        console.error(err.message);
    }    

});

//UPDATE AN ARTIST
router.put("/api/artists/:id_no",async(req,res) => {
    const{id_no} = req.params
    const {first_name, last_name, stage_name,sex,date_of_birth, email,genre,records_sold,active} = req.body;
    try{
        const updateArtist= await pool.query("UPDATE artists SET first_name= $1,last_name=$2, stage_name =$3,sex = $4,date_of_birth = $5, email = $6,genre=$7,records_sold = $8,active = $9 WHERE id_no = $10",[first_name, last_name, stage_name,sex,date_of_birth, email,genre,records_sold,active,id_no]
        );
        res.json("Artist was updated!");    

    }catch(err){
        console.log(err.message);
    }    

});

//DELETE AN ARTIST
router.delete('api/artists/:id_no', async (req, res) => {
    try{
        const{id_no} = req.params;
        const deleteArtist = await pool.query(
        "DELETE FROM artists WHERE id_no = $1",
         [id_no]
        );
        
        res.json("Artist deleted successfully!");    
    }catch(err){
        console.log(err.message);
    }    

});

module.exports = router;