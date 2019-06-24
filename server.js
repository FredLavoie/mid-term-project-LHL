"use strict";
//******************************** VARIABLES / REQUIRE ********************************/
//*************************************************************************************/

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sassMiddleware = require("node-sass-middleware");
const app         = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

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

//********************************* EXTERNAL ROUTES ***********************************/
//*************************************************************************************/

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const pointsRoutes = require("./routes/points");
const mapsRoutes = require("./routes/maps");
const favouritesRoutes = require("./routes/favourites");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client
//  error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/points", pointsRoutes(knex));
app.use("/maps", mapsRoutes(knex));
app.use("/favourites", favouritesRoutes(knex));


//*********************************** GET REQUESTS ************************************/
//*************************************************************************************/

// [HOME] page
app.get("/", (req, res) => {
  res.render("homepage_view");
});

// [CREATE MAP] Create Map
app.get("/maps/new", (req, res) => {
  res.render("new_map");
});

// [LOGIN] login page
app.get("/login", (req, res) => {
  res.render("login");
});

//  [SHOW MAP] Show map page
app.get("/maps/:map_id", (req, res) => {
  let templateVars = req.params;
  res.render("map_view", templateVars);
});

//  [CREATE POINT] New point page
app.get("/maps/:map_id/points/new", (req, res) => {
  let templateVars = req.params;
  console.log(templateVars);

  res.render("add_point", templateVars);
});

// [PROFILE] Profile view page
app.get("/users/:user_id", (req, res) => {
  if(req.cookies.cookieName){
    res.redirect(`/users/${req.cookies.cookieName}`);
  } else {
    res.redirect("/login");
  }
});

//********************************** POST REQUESTS ************************************/
//*************************************************************************************/

// [LOGIN] login post
app.post("/login", (req, res) => {
  console.log(req.body.username);
  res.cookie('cookieName', req.body.username);
  res.redirect("/");
});

// [NEW MAP] Post new map
app.post("/maps/new", (req, res) => {
  let mapName = req.body.mapname;
  let createId = req.cookies.cookieName;
  knex('maps')
    .insert({title:mapName, creator_id: createId})
    .returning("id")
    .then(function(id){
      res.redirect(`/maps/${id}/points/new`);
    });
});

// [UPDATE POINT] update points
app.post("/points/:point_id/update", (req, res) => {

  let title = req.body.title;
  let description = req.body.description;
  let image = req.body.photo;
  let lat = req.body.latitude;
  let long = req.body.longitude;
  let map_id = '';

  knex('points')
    .select('points.map_id')
    .from('points')
    .where('points.id', req.params.point_id)
    .then(function(data) {
      map_id = data[0].map_id;
    });

  knex('points')
    .where({ id: req.params.point_id })
    .update({title: title, longitude: long, latitude: lat, description: description, image: image})
    .then(function() {
      res.redirect(`/maps/${map_id}`);
    });

});

// [NEW POINT] Post form data
app.post("/maps/:mapId/points", (req, res) => {
  let pointName = req.body.name;
  let pointAbout = req.body.about;
  let pointImg = req.body.photo;
  let pointLat  = req.body.lat;
  let pointLgt = req.body.lgt;
  let pointUserId = req.cookies.cookieName;
  let pointMapId = req.params.mapId;

  knex('points')
    .insert({title:pointName,
      latitude: pointLat,
      longitude: pointLgt,
      description: pointAbout,
      image: pointImg,
      creator_id: pointUserId,
      map_id: pointMapId
    })
    .then(function() {
      res.redirect(`/maps/${pointMapId}`);
    });
});

// [add favourite]
app.post("/maps/:map_id/favourites/new", (req, res) => {
  let userId = req.cookies.cookieName;
  console.log('TESTING USERID:', userId);
  let mapId = req.params.map_id;
  console.log('TESTING MAPID:', mapId);
  knex('favourites')
    .insert({user_id: userId, map_id: mapId})
    .then(function(){
      // res.redirect('/');
    });
});

//********************************* PORT LISTENING ************************************/
//*************************************************************************************/

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

