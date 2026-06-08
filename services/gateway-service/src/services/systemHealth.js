const express = require("express")
const router = express.Router()

const { getSystemHealth } = require("../services/healthService")

router.get(
    "/deep",
    async (req , res) => {
        const health = await getSystemHealth()

        res.json(health)
    }
)

module.exports = router
