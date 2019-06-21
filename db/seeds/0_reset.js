exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('points').del(),
    knex('favourites').del(),
    knex('maps').del(),
    knex('users').del()
  ]);
};
