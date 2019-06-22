exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('maps').del(),
    knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1'), 
    knex('maps').then(function () {
      return Promise.all([
        knex('maps').insert({ title: "Parks in Montreal", creator_id: '1' }),
        knex('maps').insert({ title: "Fun time in Montreal", creator_id: '2' }),
        knex('maps').insert({ title: "Best Dentist", creator_id: '3' }),
      ]);
    }),
  ]);
};
