"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get("/:id/f", (req, res) => {
    Promise.all([
      //   knex
      //     .select("users.id as userId", "favourites.map_id")
      //     .from("users")
      //     .innerJoin("favourites", "users.id", "favourites.user_id")
      knex
        .select("maps.id as mapId", "maps.title", "favourites.user_id")
        .from("maps")
        .innerJoin("favourites", "maps.id", "favourites.map_id")
        .where("favourites.user_id", req.params.id),
      knex  
        .select("maps.id as mapId", "maps.title", "points.creator_id as userId")
        .from("maps")
        .innerJoin("points", "maps.id", "points.map_id")
        .where("points.creator_id", req.params.id)

    ])
      .then((results) => {
        const [favourites, contributions] = results;
        const resultObj = {
          favourites, contributions
        } 
        const templateVar = {userContribution: resultObj }
        res.render("map_view", templateVar); //modify json
      });
  });

  return router;
};
