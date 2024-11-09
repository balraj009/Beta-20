const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Material = require("./models/material.js");
const Thread = require("./models/thread.js");
const User = require("./models/user.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

let MONGO_URL = "mongodb://127.0.0.1:27017/studysphere";

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    mongoose.connect(MONGO_URL);
}

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ("views")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>{
    res.send("I am root");
});

app.get("/home", (req, res) =>{
    res.render("home/index.ejs");
})

app.get("/material", (req, res) => {
    res.render("materials/index.ejs");
});

app.get("/discussion", (req, res) => {
    res.render("discussion/index.ejs");
})

app.listen(port, () =>{
    console.log(`server is listening on port ${port}`);
});

