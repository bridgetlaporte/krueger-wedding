// -----------------------------------------------------------
// The Kruegers Wedding Website
// Backend Server for testing
// -----------------------------------------------------------

// connect to backend
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

let db;

// Connect to the SQL database
async function startServer(){
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT)
        });

        // test invites
        const [rows] = await db.execute(
            "SELECT COUNT(*) AS total FROM invited_parties"
        );
        console.log("connected to MySQL");
        console.log("invites found " + rows[0].total);
        
        // start server
        app.listen(3000, "127.0.0.1", function(){
            console.log("server running http://127.0.0.1:3000");
        });

    } catch(error){
        console.log("connection failed " + error.message);
    }
}


// files for RSVP page
app.use("/images", express.static(__dirname + "/images"));

app.get("/styles.css", function(req, res){
    res.sendFile(__dirname + "/styles.css");
});

app.get("/script.js", function(req, res){
    res.sendFile(__dirname + "/script.js");
});

app.get("/rsvp.html", function(req, res){
    res.sendFile(__dirname + "/rsvp.html");
});


// test
app.get("/", function(req, res){
    res.send("server is running");
});


// RSVP Submit --------------------------------------------

app.post("/api/rsvp", async function(req, res){
    // Get the information from the RSVP form
    const form = req.body || {};

    // Check required fields
    if(!form.code || !form.firstName || !form.lastName || !form.email || !form.streetAddress || !form.city || !form.state || !form.postalCode || !form.country ||
        (form.attendance !== "yes" && form.attendance !== "no")){

        return res.status(400).json({message: "Please complete the form."});
    }

    try {
        // find invitation and save  response
        const [result] = await db.execute(
            `INSERT INTO rsvp_responses
            (party_id, first_name, last_name, email, street_address, city, state_region, postal_code, country, attendance)
            SELECT party_id, ?, ?, ?, ?, ?, ?, ?, ?, ?
            FROM invited_parties
            WHERE invitation_code = ?`,
            [
                form.firstName,
                form.lastName,
                form.email,
                form.streetAddress,
                form.city,
                form.state,
                form.postalCode,
                form.country,
                form.attendance,
                form.code.trim()
            ]
        );

        // invite code not found
        if(result.affectedRows === 0){
            return res.status(400).json({message: "Invalid code."});
        }
        // submission saved
        res.json({message: "Your RSVP has been saved!"});

    }catch(error){
        
        // no duplicate responses
        if(error.code === "ER_DUP_ENTRY"){
            return res.status(400).json({message: "You have already submitted an RSVP. Contact us to make a change."});
        }
        console.log(error.message);
        res.status(500).json({message: "Unable to save RSVP. Contact us if you need help."});
    }

});


startServer();
