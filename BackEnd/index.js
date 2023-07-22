const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");


const mysql = require('mysql');


const app = express()

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "I$ururoot123",
    database: "recipes"

});



app.use(express.json())

//To allow to using backend server API







app.use(
    cookieSession({ name: "session", keys: ["Isuru"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5000"],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );



app.use("/auth", authRoute);

app.listen(5000, () => {

    console.log("Backend is okay lets starttttt!");
})
