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


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/points", pointsRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.render("index");
});


//  page
app.get("/maps/:map_id", (req, res) => {
  console.log(res);
  let templateVars = { };
  res.render("map_view", templateVars);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

