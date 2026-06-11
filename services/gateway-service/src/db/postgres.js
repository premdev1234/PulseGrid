const { Pool } = require("pg")

const pool = process.env.DATABASE_URL
    ? new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false,
          },
      })
    : new Pool({
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
      })


async function connectPostgres() {

    let retries = 15

    while (retries > 0) {

        try {

            const client =
                await pool.connect()

            console.log(
                "PostgreSQL connected"
            )

            client.release()

            return

        } catch (err) {

            retries--

            console.log(
                `Waiting for PostgreSQL... ${retries} retries left`
            )

            await new Promise(
                resolve =>
                    setTimeout(resolve, 3000)
            )
        }
    }

    throw new Error(
        "Could not connect to PostgreSQL"
    )
}

module.exports = {
    pool,
    connectPostgres,
}
