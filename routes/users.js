"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    Promise.all([
      knex
        .select("maps.id as mapId", "maps.title", "favourites.user_id")
        .from("maps")
        .innerJoin("favourites", "maps.id", "favourites.map_id")
        .where("favourites.user_id", req.params.id),
      knex
        .select("maps.id as mapId", "maps.title", "points.creator_id as userId", "points.title as pointTitle")
        .from("maps")
        .innerJoin("points", "maps.id", "points.map_id")
        .where("points.creator_id", req.params.id)
    ])
      .then((results) => {
        const [favourites, contributions] = results;
        const resultObj = {
          favourites, contributions
        };
        res.render("profile", resultObj);
        // res.json(resultObj);
      });
  });
  return router;
};
