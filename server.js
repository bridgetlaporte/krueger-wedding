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

        // Test invitations
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

// test
app.get("/", function(req, res){
    res.send("server is running");
});

startServer();
