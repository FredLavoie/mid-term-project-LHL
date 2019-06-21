exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('points').del(),
    knex.raw('ALTER SEQUENCE points_id_seq RESTART WITH 1'),
    knex('points').then(function () {
      return Promise.all([
        knex('points').insert({ title: "Joyce Park", longitude: "-73.615215", latitude: "45.5148217", description: "A small park but very quiet.", image: "https://tennisjoyce.net/wp-content/uploads/2012/02/parc_joyce_01b-922x516.jpg", creator_id: "1", map_id: "1" }),
        knex('points').insert({ title: "Wario Park", longitude: "-73.604232", latitude: "45.5276578", description: "This park is worth checking out!", image: "https://wallup.net/wp-content/uploads/2016/01/310078-nature-landscape-waterfall-forest-sunrise-trees-clouds-British_Columbia-Canada-long_exposure-daylight-300x200.jpg", creator_id: "3", map_id: "2" }),
        knex('points').insert({ title: "Parc Maisonneuve", longitude: "-73.5613775", latitude: "45.5631284", description: "Beautiful large park with plenty of space to play.", image: "https://habitermontreal.com/sites/habitermontreal.com/files/styles/habiter-modal-non-contraint/public/choixhabitermontrealn-rosemontcfrederiquemenardaubin-0122_0.jpg?itok=6kETeLIJ", creator_id: "1", map_id: "1" }),
        knex('points').insert({ title: "Swartz's Deli", longitude: "-73.5776355", latitude: "45.5163346", description: "Best smokemeat in Montreal!", image: "https://icdn2.themanual.com/image/themanual/hill-country-barbecue-brisket-2.jpg", creator_id: "2", map_id: "2" }),
        knex('points').insert({ title: "Jazz Bar", longitude: "-73.576426", latitude: "45.4953355", description: "Live jazz music with talented music player.", image: "https://www.mtl.org/sites/default/files/2017-07/03014H.jpg", creator_id: "2", map_id: "2" }),
        knex('points').insert({ title: "Pang Pang Karaoke", longitude: "-73.5760956", latitude: "45.4950864", description: "Sing along with your friends.", image: "https://cdn.vox-cdn.com/uploads/chorus_image/image/62468371/barkkaraoke.0.0.0.0.0.jpg", creator_id: "1", map_id: "2" }),
        knex('points').insert({ title: "Dentist", longitude: "-73.448327", latitude: "45.4778004", description: "Doctor is talented and nice!", image: "https://www.alphadentalclinic.ca/wp-content/uploads/alpha-15-opt-1024x745.jpg", creator_id: "3", map_id: "3" }),
        knex('points').insert({ title: "Best Dentist", longitude: "-73.7882494", latitude: "45.5600215", description: "Dentist is far but worth it!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsAJ2IX7CMHKG4XI7VjJWGRAZ7dK0pPuaGcgxWpF3ZiIK3Zp7fgA", creator_id: "3", map_id: "3" }),
      ]);
    }),
  ]);
};

