exports.seed = function(knex, Promise) {
  return knex('url').del()
  .then(() => knex('categories').del())
    .then(() => { return Promise.all([
      knex('categories').insert([
        {id: 1, folder: 'sports', updated_at:'2017-06-29T05:58:16.533Z', created_at: '2017-06-29T05:58:16.533Z'},
        {id: 2, folder: 'school', updated_at:'2017-06-29T05:58:16.533Z', created_at:'2017-06-29T05:58:16.533Z'},
        {id: 3, folder: 'stuff', updated_at:'2017-06-29T05:58:16.533Z', created_at: '2017-06-29T05:58:16.533Z'}
      ]),
      knex('url').insert([
        {id: 1, title: 'google', url:"https://google.com",url_shortened:"googs",categories_id:1, visits:3 },
        {id: 2, title: 'bah', url:"https://bah.com",url_shortened:"bah",categories_id:2, visits:5 },
        {id: 3, title: 'bo', url:"https://bo.com",url_shortened:"bo",categories_id:1, visits:1 }
      ])
    ])
  });
};
