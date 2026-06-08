const { pool } = require("../db/postgres")

async function saveInvestigation(data){
    const query = `
        INSERT INTO investigations
        (
        symbol,
        anomaly_type,
        severity,
        investigation
        )
        VALUES ($1, $2, $3, $4)
    `
    const values = [
        data.symbol, 
        data.type, 
        data.severity,
        data.investigation,
    ]
    const result = await pool.query(
        query,
        values  
    )

    return result.rows[0]
}
async function getInvestigationByAnomaly(
    symbol,
    anomalyType
) {

    const query = `
    SELECT *
    FROM investigations
    WHERE symbol = $1
    AND anomaly_type = $2
    ORDER BY created_at DESC
    LIMIT 1
    `

    const result = await pool.query(
        query,
        [symbol, anomalyType]
    )

    return result.rows[0]
}
module.exports ={
    saveInvestigation,
    getInvestigationByAnomaly,
}