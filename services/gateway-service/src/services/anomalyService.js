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
    `
    const values = [
        anomaly.symbol,
        anomaly.type,
        anomaly.severity,
    ]
    await pool.query(query, values)
}
module.exports = {
    saveAnomaly,
}