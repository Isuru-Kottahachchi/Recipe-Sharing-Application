import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors"


{/*const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");*/}

//Create express app
const app = express()

//Create Mysql db connection
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "I$ururoot123",
    database: "recipes"

});

app.use(express.json())

//To allow to using backend server API
app.use(cors())

//Api request using express server 
app.get("/", (req, res) => {
    res.json("hello");
});


//REST API endpoints that we can use from browser or REST Client/Postman
app.get("/recipes", (req, res) => {
    const query = "SELECT * FROM recipes";
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});


app.post("/recipes", (req, res) => {
    const query = "INSERT INTO recipes(`recipe_name`, `recipe_country`, `recipe_category`,`recipe_ingredient`,`recipe_description`,`image`) VALUES (?)";

    const values = [
        req.body.recipe_name,
        req.body.recipe_country,
        req.body.recipe_category,
        req.body.recipe_ingredient,
        req.body.recipe_description,
        req.body.image,
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


app.delete("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
    const query = " DELETE FROM recipes WHERE id = ? ";

    db.query(query, [recipeId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});



app.put("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
    const query = "UPDATE recipes SET `recipe_name`= ?, `recipe_country`= ?, `recipe_category`= ?,`recipe_ingredient` =?, `recipe_description` =? , `image` =? WHERE id = ?";

    const values = [
        req.body.recipe_name,
        req.body.recipe_country,
        req.body.recipe_category,
        req.body.recipe_ingredient,
        req.body.recipe_description,
        req.body.image,
    ];

    db.query(query, [...values, recipeId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});












{/*app.use(
    cookieSession({ name: "session", keys: ["Isuru"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
app.use("/auth", authRoute);*/}





app.listen(5000, () => {

    console.log("Backend is okay!!");
})