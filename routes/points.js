"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("points")
      .orderBy('id', 'desc')
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:point_id/update", (req, res) => {
    Promise.all([
      knex
        .select("*")
        .from("points")
        .where("points.id", req.params.point_id),
    ])
      .then((results) => {
        let obj = results[0][0];
        // console.log(obj);

        res.render("update_point", obj);
        // res.json(obj);
      });
  });

  return router;
};
