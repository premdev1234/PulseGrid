const { saveAnomaly } = require("./anomalyService")
const { publishAnomaly } = require("../redis/client")

async function processAnomaly(anomaly, io) {

    const savedAnomaly = await saveAnomaly(anomaly)

    const anomalyEvent = {
        id: savedAnomaly.id,
        symbol: savedAnomaly.symbol,
        type: savedAnomaly.anomaly_type,
        severity: savedAnomaly.severity,
        created_at: savedAnomaly.created_at,

        percentChange: anomaly.percentChange,
        price: anomaly.price,
        volume: anomaly.volume,
        timestamp: anomaly.timestamp,
    }

    await publishAnomaly(anomaly)

    io.emit(
        "anomaly_detected",
        anomalyEvent
    )

    return anomalyEvent
}

module.exports = {
    processAnomaly,
} 