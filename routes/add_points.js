"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
    router.post("/points", (req, res) => {
        knex
            .insert({title:pointName,
                latitude: pointLat,
                longitude: pointLgt,
                description: pointAbout,
                image: pointImg 
                console.log("TITLE:",pointName)
              })
            .then((results) => {
                res.json(results);
            })
            .finally(() => knex.destroy())

    });

    return router;
};

// knex('points')


// function listTheData(rows) {
//     for (row of rows) {
//         const { title, latitude, longitude, description, image } = row
//         console.log(`${title}, ${latitude}, ${longitude}, ${description}, ${image}`)
//     }
// }

