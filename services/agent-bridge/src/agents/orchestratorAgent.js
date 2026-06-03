const { analyzeRisk, } = require("./riskAgent")
const { analyzeVolatility, } = require("./volatilityAgent")
async function orchestrateInvestigation(anomaly, historicalContext) {
    const [
        riskAnalysis,
        volatilityAnalysis,
    ] = await Promise.all([
        analyzeRisk(anomaly,historicalContext),
        analyzeVolatility(anomaly,historicalContext),
    ])
    return `
=== RISK ANALYSIS ===
${riskAnalysis}
=== VOLATILITY ANALYSIS ===
${volatilityAnalysis}
`
}
module.exports = {
    orchestrateInvestigation,
}