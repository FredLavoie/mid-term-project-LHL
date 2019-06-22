exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('favourites').del(),
    knex.raw('ALTER SEQUENCE favourites_id_seq RESTART WITH 1'), 
    knex('favourites').then(function () {
      return Promise.all([
        knex('favourites').insert({ user_id: "3", map_id: "1" }),
        knex('favourites').insert({ user_id: "1", map_id: "3" }),
        knex('favourites').insert({ user_id: "1", map_id: "2" }),
        knex('favourites').insert({ user_id: "2", map_id: "2" }),
      ]);
    }),
  ]);
};
