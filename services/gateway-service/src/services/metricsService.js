const { pool } = require("../db/postgres")

const START_TIME = Date.now()

async function getMetrics() {

    const alerts =
        await pool.query(`
            SELECT COUNT(*) AS count
            FROM anomaly_events
        `)

    const investigations =
        await pool.query(`
            SELECT COUNT(*) AS count
            FROM investigations
        `)

    return {

        alerts:
            Number(
                alerts.rows[0].count
            ),

        investigations:
            Number(
                investigations.rows[0].count
            ),

        uptime:
            Math.floor(
                (Date.now() - START_TIME)
                / 1000
            ),
    }
}

module.exports = {
    getMetrics,
}