exports.seed = function(knex, Promise) {
  return knex('url').del()
    .then(function () {
      return knex('url').insert([
        {id: 1, title: 'google', url:"https://google.com",url_shortened:"googs",categories_id:1 },
        {id: 2, title: 'bah', url:"https://bah.com",url_shortened:"bah",categories_id:2 },
        {id: 3, title: 'bo', url:"https://bo.com",url_shortened:"bo",categories_id:1 },

      ]);
    });
};
