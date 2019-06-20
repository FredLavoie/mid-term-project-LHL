exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').then(function() {
      return Promise.all([
        knex('users').insert({ name: 'Alice', email: 'alice@javascript.com', password: 'abcd' }),
        knex('users').insert({ name: 'Bob', email: 'bob@javascript.com', password: 'efgh' }),
        knex('users').insert({ name: 'Charlie', email: 'charlie@javascript.com', password: '1234' }),
      ]);
    }),
  ]);
};
