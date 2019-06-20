exports.up = function (knex, Promise) {
  return Promise.all([
    knex
      .schema
      .table('users', function (table) {
        table
          .string('email')
          .unique();
        table.string('password');
      })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex
      .schema
      .table('users', function (table) {
        table.dropColumn('email');
        table.dropColumn('password');
      })
  ]);
};
