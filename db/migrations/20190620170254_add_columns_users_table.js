
exports.up = function(knex, Promise) {  
    return Promise.all([
    knex.schema.table('users', function(table){
      table.unique('email');
      table.string('password');
    })
    ])
  };
  
  exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.table('users', function(table) {
          table.dropColumn('email');
          table.dropColumn('password');
      })
    ])
  };
