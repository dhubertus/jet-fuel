exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.integer('visits')
      table.string('folder').unique();
      table.timestamps(true);
    }),

    knex.schema.createTable('url', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('url_shortened');
      table.integer('categories_id').unsigned()
      table.foreign('categories_id')
      .references('categories.id');
      table.timestamps(true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('url'),
    knex.schema.dropTable('categories')
  ]);
};
