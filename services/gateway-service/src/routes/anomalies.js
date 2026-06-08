const express = require("express")

const router = express.Router()

const { getRecentAnomalies, getAnomalyById,} = require("../services/anomalyService")

router.get("/", async (req, res) => {

    try {

        const anomalies =
            await getRecentAnomalies()

        res.json(anomalies)

    } catch (err) {

        console.error(
            "ANOMALIES ERROR:",
            err
        )

        res.status(500).json({
            error: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const anomaly =await getAnomalyById(req.params.id)
        if (!anomaly) {
            return res.status(404).json({
                error:
                     "Anomaly not found",
                })
        }
        res.json(anomaly)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error:"Failed to fetch anomaly",
        })
    }
})

module.exports = router