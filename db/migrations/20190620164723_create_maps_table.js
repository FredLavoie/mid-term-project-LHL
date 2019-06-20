
exports.up = function (knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('id');
    table.string('title');
    table.integer('creator_id').unsigned();
    table.foreign('creator_id').references('users.id');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('maps');
};
