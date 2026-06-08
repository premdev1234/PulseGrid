const express = require("express")

const router = express.Router()

const { redisClient } = require("../redis/client")
const { processAnomaly } = require("../services/anomalyWorkflowService")

const quoteScenarios = {
    "price-spike": [
        {
            symbol: "BTCUSDT",
            price: 67200,
            volume: 1200,
            source: "demo",
        },
        {
            symbol: "BTCUSDT",
            price: 71950,
            volume: 2420,
            source: "demo",
        },
    ],
}

const directAnomalies = {
    "spread-widening": {
        symbol: "ETHUSDT",
        type: "SPREAD_WIDENING",
        severity: "HIGH",
        percentChange: 0.4,
        price: 3820,
        volume: 860,
        source: "demo",
        metadata: {
            bid: 3812.2,
            ask: 3844.9,
            spreadBps: 85,
            normalSpreadBps: 12,
        },
    },
    "stale-feed": {
        symbol: "SOLUSDT",
        type: "STALE_FEED_LATENCY",
        severity: "MEDIUM",
        percentChange: 0,
        price: 168.4,
        volume: 410,
        source: "demo",
        metadata: {
            lastTickAgeMs: 8400,
            normalTickAgeMs: 700,
            gatewayLatencyMs: 1290,
        },
    },
}

async function publishQuote(quote) {
    await redisClient.publish(
        "quotes",
        JSON.stringify({
            ...quote,
            timestamp: Date.now(),
        })
    )
}

router.post("/:scenario", async (req, res) => {
    try {
        const { scenario } = req.params

        if (quoteScenarios[scenario]) {
            const quotes = quoteScenarios[scenario]

            await publishQuote(quotes[0])
            setTimeout(() => {
                publishQuote(quotes[1]).catch((err) => {
                    console.error(
                        "Demo quote publish failed:",
                        err.message
                    )
                })
            }, 350)

            res.json({
                scenario,
                status: "started",
            })
            return
        }

        if (directAnomalies[scenario]) {
            const io = req.app.get("io")
            const anomaly = {
                ...directAnomalies[scenario],
                timestamp: Date.now(),
            }
            const result = await processAnomaly(anomaly, io)

            res.json({
                scenario,
                anomaly,
                investigation: result?.investigation || null,
            })
            return
        }

        res.status(404).json({
            error: "Unknown demo scenario",
        })
    } catch (err) {
        console.error(
            "Demo scenario failed:",
            err.message
        )
        res.status(500).json({
            error: "Demo scenario failed",
        })
    }
})

module.exports = router
