import knex from "knex"

const knexConnection = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        port: 3306,
        database: "desafion8"
    }
})

export default knexConnection