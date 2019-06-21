exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('points').del(),
    knex.raw('ALTER SEQUENCE points_id_seq RESTART WITH 1'),
    knex('points').then(function () {
      return Promise.all([
        knex('points').insert({ title: "Joyce Park", longitude: "-73.615215", latitude: "45.5148217", description: "Best smokemeat in Montreal!", image: "https://tennisjoyce.net/wp-content/uploads/2012/02/parc_joyce_01b-922x516.jpg", creator_id: "1", map_id: "1" }),
        knex('points').insert({ title: "Wario Park", longitude: "-73.604232", latitude: "45.5276578", description: "Very skilled dentist and clean clinic.", image: "dentist.png", creator_id: "3", map_id: "2" }),
        knex('points').insert({ title: "Parc Maisonneuve", longitude: "-73.5613775", latitude: "45.5631284", description: "A lot of green area to watch the fireworks in town! Head to the grassy area near the waterfront of the city beafore the bridge...", image: "fireworks.png", creator_id: "2", map_id: "3" }),
      ]);
    }),
  ]);
};
