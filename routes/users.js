"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {



  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        console.log('The users table:' + results);

        res.json(results);
    });
  });

  return router;
}
