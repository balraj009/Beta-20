const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Material = require("./models/material.js");
const Thread = require("./models/thread.js");
const User = require("./models/user.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

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
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("I am root");
});

app.get("/loading", (req, res) => {
    res.render("login/loading.ejs");
});

app.get("/login", (req, res) => {
    res.render("login/login.ejs");
});

app.get("/home", (req, res) =>{
    res.render("home/index.ejs");
});

app.get("/material", (req, res) => {
    res.render("materials/index.ejs");
});

app.get("/discussion", (req, res) => {
    res.render("discussion/index.ejs");
});

// User registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.redirect("/login");
});

// User login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Generate token
    const token = jwt.sign({ _id: user._id }, 'secretkey');

    res.render("home/index.ejs");
});

// Route to render user profile
app.get("/profile", async (req, res) => {
    // const user = await User.findById(req.user._id).lean(); // Convert mongoose document to plain JS object
    res.render("home/profile.ejs");
});

app.listen(port, () =>{
    console.log(`server is listening on port ${port}`);
});

