
exports.up = function(knex, Promise) {  
    return Promise.all([
    knex.schema.table('points', function(table){
      table.string('image').alter();  
    })
    ]);
  };
  
  exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.table('points', function(table) {
          table.binary('image')
      })
    ]);
  };
