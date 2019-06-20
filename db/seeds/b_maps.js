exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('maps').del(),
    knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1'), 
    knex('maps').then(function () {
      return Promise.all([
        knex('maps').insert({ title: "Restaurants in Griffintown", creator_id: '1' }),
        knex('maps').insert({ title: "Recommendation for Harisson", creator_id: '2' }),
        knex('maps').insert({ title: "Best Dentist", creator_id: '3' }),
      ]);
    }),
  ]);
};
