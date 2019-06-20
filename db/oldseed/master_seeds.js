exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('points').del(),
    knex('favourites').del(),
    knex('maps').del(),
    knex('users').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').then(function() {
      return Promise.all([
        knex('users').insert({ name: 'Alice', email: 'alice@javascript.com', password: 'abcd' }),
        knex('users').insert({ name: 'Bob', email: 'bob@javascript.com', password: 'efgh' }),
        knex('users').insert({ name: 'Charlie', email: 'charlie@javascript.com', password: '1234' }),
      ]);
    }),
    knex.raw('ALTER SEQUENCE maps_id_seq RESTART WITH 1'), 
    knex('maps').then(function () {
      return Promise.all([
        knex('maps').insert({ title: "Restaurants in Griffintown", creator_id: '1' }),
        knex('maps').insert({ title: "Recommendation for Harisson", creator_id: '2' }),
        knex('maps').insert({ title: "Best Dentist", creator_id: '3' }),
      ]);
    }),
    knex.raw('ALTER SEQUENCE favourites_id_seq RESTART WITH 1'), 
    knex('favourites').then(function () {
      return Promise.all([
        knex('favourites').insert({ user_id: "3", map_id: "1" }),
        knex('favourites').insert({ user_id: "1", map_id: "3" }),
        knex('favourites').insert({ user_id: "1", map_id: "2" }),
      ]);
    }),
    knex.raw('ALTER SEQUENCE points_id_seq RESTART WITH 1'), 
    knex('points').then(function () {
      return Promise.all([
        knex('points').insert({ title: "Schwartz deli", longitude: "121.481172", latitude: "31.236206", description: "Best smokemeat in Montreal!", image: "smokemeat.png", creator_id: "1", map_id: "1" }),
        knex('points').insert({ title: "Dentist", longitude: "-122.821234", latitude: "49.314109", description: "Very skilled dentist and clean clinic.", image: "dentist.png", creator_id: "3", map_id: "2" }),
        knex('points').insert({ title: "Free spot to watch fireworks.", longitude: "-70.871709", latitude: "42.104268", description: "A lot of green area to watch the fireworks in town! Head to the grassy area near the waterfront of the city beafore the bridge...", image: "fireworks.png", creator_id: "2", map_id: "3" }),
      ]);
    }),
  ]);
};

