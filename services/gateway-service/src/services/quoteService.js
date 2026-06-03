const { pool } = require("../db/postgres")
async function saveQuote(quote) {
    const query = `
    INSERT INTO market_ticks
    (
        symbol,
        price,
        volume
    )
    VALUES ($1, $2, $3) 
    `
    const values = [
        quote.symbol,
        quote.price,
        quote.volume,
    ]
    await pool.query(query, values)
}

module.exports = {
    saveQuote,
}