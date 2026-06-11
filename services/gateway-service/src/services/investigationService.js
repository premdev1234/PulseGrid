const { pool } = require("../db/postgres")

async function saveInvestigation(data) {

    const query = `
        INSERT INTO investigations
        (
            symbol,
            anomaly_type,
            severity,
            investigation,
            root_cause,
            confidence
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        RETURNING *
    `

    const result =
        await pool.query(
            query,
            [
                data.symbol,
                data.type,
                data.severity,
                data.investigation,
                data.rootCause,
                data.confidence,
            ]
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

async function getAllInvestigations() {

    const result =
        await pool.query(`
            SELECT *
            FROM investigations
            ORDER BY created_at DESC
            LIMIT 100
        `)

    return result.rows
}

async function getInvestigationById(id) {

    const result =
        await pool.query(
            `
            SELECT *
            FROM investigations
            WHERE id = $1
            `,
            [id]
        )

    return result.rows[0]
}

module.exports = {
    saveInvestigation,
    getInvestigationByAnomaly,
    getAllInvestigations,
    getInvestigationById,
}