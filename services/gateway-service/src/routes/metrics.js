const express = require("express")

const router = express.Router()

const {
    getMetrics,
} = require("../services/metricsService")

router.get(
    "/",
    async (req, res) => {

        try {

            const metrics =
                await getMetrics()

            res.json(metrics)

        } catch (err) {

            res.status(500).json({
                error:
                    "Failed loading metrics",
            })

        }
    }
)

module.exports = router