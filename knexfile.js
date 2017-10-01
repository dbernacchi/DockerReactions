module.exports = {

    development: {
      client: "mysql2",
      connection: {
        host: "127.0.0.1",
        user: "pgdwriter",
        password: "2m7JgHaAJp?U%F2F2CTbr^Ax#'",
        database: "pg_docker"
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: "knex_migrations"
      }
    },

    production: {
      client: "mysql2",
      connection: {
        host: "127.0.0.1",
        user: "pgdwriter",
        password: "2m7JgHaAJp?U%F2F2CTbr^Ax#'",
        database: "pg_docker"
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: "knex_migrations"
      }
    }

  };
