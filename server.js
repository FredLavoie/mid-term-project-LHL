"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sassMiddleware = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

//sass middleware
app.use(
  sassMiddleware({
    src: "scss",
    dest: "public/styles",
    debug: true,
    outputStyle: "compressed",
    prefix: "/styles" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const pointsRoutes = require("./routes/points");
const mapsRoutes = require("./routes/maps");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for
// client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/users/:user_id", usersRoutes(knex));
app.use("/points", pointsRoutes(knex));
app.use("/maps", mapsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("homepage_view");
});


//  page
app.get("/maps/:map_id", (req, res) => {
  let templateVars = req.params;
  res.render("map_view", templateVars);
});

//  new point page
app.get("/points/new", (req, res) => {  
  res.render("add_point");
});

// // Profile view page
// app.get("/users/:user_id", (req, res) => {
//   res.render("profile");
// });

app.post("/points", (req, res) => {
let pointName = req.body.name;
let pointAbout = req.body.about;
let pointImg = req.body.photo;
let pointLat  = req.body.lat;
let popintLgt = req.body.lgt;

})

app.listen(PORT, () => {
  console.log("Wiki Maps listening on port " + PORT);
});

