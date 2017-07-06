exports.seed = function(knex, Promise) {
  return knex('url').del()
  .then(() => knex('categories').del())
    .then(() => { return Promise.all([
      knex('categories').insert([
        {id: 1, folder: 'sports', updated_at:'2017-06-29T05:58:16.533Z', created_at: '2017-06-29T05:58:16.533Z'},
        {id: 2, folder: 'school', updated_at:'2017-06-29T05:58:16.533Z', created_at:'2017-06-29T05:58:16.533Z'},
        {id: 3, folder: 'stuff', updated_at:'2017-06-29T05:58:16.533Z', created_at: '2017-06-29T05:58:16.533Z'}
      ]).then(() => {
        return knex('url').insert([
          {id: 1, title: 'google', url:'https://google.com', visits:3, url_shortened:'googs', categories_id:1  },
          {id: 2, title: 'bah', url:'https://bah.com', visits:5, url_shortened:'bah', categories_id:2 },
          {id: 3, title: 'bo', url:'https://bo.com', visits:1, url_shortened:'bo', categories_id:1 }
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  });
};
