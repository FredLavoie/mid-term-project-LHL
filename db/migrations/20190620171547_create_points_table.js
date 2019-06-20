
exports.up = function(knex, Promise) {
    return knex.schema.createTable('points', function (table) {
      table.increments('id');
      table.string('title');
      table.float('latitude').notNullable();
      table.float('longitude').notNullable();
      table.string('description', 1000);
      table.binary('image');
      table.integer('creator_id').unsigned();
      table.foreign('creator_id').references('users.id');
      table.integer('map_id').unsigned();
      table.foreign('map_id').references('maps.id');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('points');
  };
  table.float()
  