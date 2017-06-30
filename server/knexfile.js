module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/jetfuel',
    migrations: {
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/jetfuel',
    migrations: {
      directory: 'server/db/migrations'
    },
    seeds: {
      directory: 'server/db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
