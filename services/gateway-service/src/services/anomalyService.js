const { pool } = require("../db/postgres")

async function saveAnomaly(anomaly) {
    const query = `
    INSERT INTO anomaly_events
    (
        symbol,
        anomaly_type,
        severity
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const values = [
        anomaly.symbol,
        anomaly.type,
        anomaly.severity,
    ]
    
    const result = await pool.query(query, values)

    return result.rows[0]
}
async function getRecentAnomalies(limit = 100){
    const query = `
    SELECT *
    FROM anomaly_events
    ORDER BY created_at DESC
    LIMIT $1
    `

    const result = await pool.query(
        query,
        [limit]
    )

    return result.rows
}

async function getAnomaliesById(id) {
    const query = `
    SELECT *
    FROM anomaly_events
    WHERE id = $1
    `

    const result = await pool.query(
        query,
        [id]
    )

    return result.rows[0]
}

module.exports = {
    saveAnomaly,
    getRecentAnomalies,
    getAnomaliesById,
}