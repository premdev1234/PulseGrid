const { createClient } = require("redis")
const { saveQuote } = require("../services/quoteService")
const { analyzeQuote } = require("../services/analyticsService")
const { processAnomaly } = require("../services/anomalyWorkflowService")

async function startSubscriber(io) {
    const subscriber = createClient({
        url: process.env.REDIS_URL,
    })
    await subscriber.connect()
    console.log("Redis subscriber connected")
    await subscriber.subscribe(
    "quotes",
    async (message) => {
        const parsed = JSON.parse(message)
        console.log(
            "Received quote:",
            parsed
        )
        await saveQuote(parsed)
        const anomaly = analyzeQuote(parsed)
        if (anomaly) {
            console.log(
                "Anomaly detected:",
                anomaly
            )
            await processAnomaly(anomaly, io)
        }
        io.emit(
            "quote_update",
            parsed
        )
    }
)
}
module.exports = {
    startSubscriber,
}
