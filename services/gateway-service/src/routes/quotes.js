const express = require("express")
const router = express.Router()
const { pool } = require("../db/postgres")
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params
  const query = `
    SELECT *
    FROM market_ticks
    WHERE symbol = $1
    ORDER BY created_at DESC
    LIMIT 50
  `
  const result =
    await pool.query(query, [symbol])
  res.json(result.rows)
})
module.exports = router