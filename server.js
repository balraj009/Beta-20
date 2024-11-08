const express = require("express");
const app = express();
const mongoose = require("mongoose");

let MONGO_URL = "mongodb://127.0.0.1:27017/studysphere";

let port = 8080;

app.get("/", (req, res) =>{
    res.send("I am root");
});

app.listen(port, () =>{
    console.log(`server is listening on port ${port}`);
});