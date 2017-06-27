exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 1, name: 'sports'},
        {id: 2, name: 'school'},
        {id: 3, name: 'stuff'}
      ]);
    });
};
