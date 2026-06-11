const { getMemoryCollection, getRecentInvestigations, } = require("./memoryService")
const { orchestrateInvestigation, } = require("../agents/orchestratorAgent")

function buildIncidentId(anomaly) {
    const symbol = anomaly.symbol || "unknown"
    const timestamp = Date.now()

    return `${symbol}-${timestamp}`
}

async function investigateAnomaly(anomaly) {
    try {
        const previousInvestigations = await getRecentInvestigations(
            anomaly.symbol
        )
        const result = await orchestrateInvestigation(
            anomaly,
            previousInvestigations
        )
        const memoryCollection = getMemoryCollection()
        const incidentId = buildIncidentId(anomaly)

        await memoryCollection.insertOne({
            incidentId,
            alert: {
                symbol: anomaly.symbol,
                type: anomaly.type,
                severity: anomaly.severity,
                status: "investigated",
                createdAt: new Date(),
            },
            anomaly,
            investigation: result.investigation,
            rootCause: result.rootCause,         
            confidence: result.confidence,
            riskAnalysis: result.riskAnalysis,
            volatilityAnalysis: result.volatilityAnalysis,
            memoryMatches: result.memoryMatches,
            dataUsed: result.dataUsed,
            status: "investigated",
            createdAt: new Date(),
        })

        return result
    } catch (err) {
        console.error(
            "Investigation pipeline failed:"
        )
        console.error(
            err.response?.data ||
            err.message
        )
        return "Investigation failed"
    }
}
module.exports = {
    investigateAnomaly,
}
