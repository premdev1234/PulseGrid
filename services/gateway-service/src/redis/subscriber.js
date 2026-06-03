const { createClient } = require("redis")
const { saveQuote } = require("../services/quoteService")
const { analyzeQuote } = require("../services/analyticsService")
const { saveAnomaly } = require("../services/anomalyService")
const { publishAnomaly } = require("./client")
const { triggerInvestigation } = require("../services/agentTriggerService")
const { saveInvestigation } = require("../services/investigationService")

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
            await saveAnomaly(anomaly)
            await publishAnomaly(anomaly)
            const investigation = await triggerInvestigation(anomaly)
            if (investigation) {
                console.log(
                    "AI Investigation:",
                    investigation
                )
                await saveInvestigation({
                    ...anomaly,
                    investigation,
                })
                io.emit(
                    "investigation_completed",
                    {
                        ...anomaly,
                        investigation,
                    }
                )
            }
            io.emit(
                "anomaly_detected",
                anomaly
            )
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