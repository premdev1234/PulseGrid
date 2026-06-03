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
    await pool.query(query, values)
}
module.exports ={saveInvestigation,}