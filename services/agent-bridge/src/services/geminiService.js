const { getMemoryCollection, getRecentInvestigations, } = require("./memoryService")
const { orchestrateInvestigation, } = require("../agents/orchestratorAgent")
async function investigateAnomaly(anomaly) {
    try {
        const previousInvestigations = await getRecentInvestigations(
            anomaly.symbol
        )
        const historicalContext = previousInvestigations.map((item) => {
            return `
Previous Investigation:${item.investigation}
`
        })
            .join("\n")
        const investigation = await orchestrateInvestigation(
            anomaly,
            historicalContext
        )
        const memoryCollection = getMemoryCollection()
        await memoryCollection.insertOne({
            anomaly,
            investigation,
            createdAt:
                new Date(),
        })
        return investigation
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