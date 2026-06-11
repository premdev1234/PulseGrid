const { analyzeRisk, } = require("./riskAgent")
const { analyzeVolatility, } = require("./volatilityAgent")

function buildInvestigationContext(anomaly, previousInvestigations) {
    const history = previousInvestigations.length
        ? previousInvestigations.map((item, index) => {
            return `
Previous Investigation ${index + 1}
Created At: ${item.createdAt}
Status: ${item.status || "unknown"}
Summary:
${item.investigation}
`
        }).join("\n")
        : "No previous investigations found for this symbol."

    return `
Live anomaly data:
${JSON.stringify(anomaly, null, 2)}

MongoDB memory context:
${history}
`
}

function buildFinalInvestigation(anomaly, riskAnalysis, volatilityAnalysis, previousInvestigations) {
    const dataUsed = [
        `symbol=${anomaly.symbol || "unknown"}`,
        `type=${anomaly.type || "unknown"}`,
        `severity=${anomaly.severity || "unknown"}`,
        `percentChange=${anomaly.percentChange ?? "not provided"}`,
        `memoryMatches=${previousInvestigations.length}`,
    ].join(", ")

    return `
=== PULSEGRID AGENT INVESTIGATION ===
Symbol: ${anomaly.symbol || "unknown"}
Anomaly Type: ${anomaly.type || "unknown"}
Severity: ${anomaly.severity || "unknown"}

Agent Workflow:
1. Inspected the incoming anomaly payload.
2. Retrieved recent MongoDB memory for the same symbol.
3. Ran risk and volatility specialist analyses.
4. Produced a grounded diagnosis with uncertainty marked.

Data Used:
${dataUsed}

=== RISK ANALYSIS ===
${riskAnalysis}

=== VOLATILITY ANALYSIS ===
${volatilityAnalysis}

Guardrails:
- Causes are hypotheses unless supported by the supplied anomaly or memory.
- No trading or destructive action is authorized by this investigation.
- Confirm with live market depth, feed health, and recent trade prints before escalation.
`
}

async function orchestrateInvestigation(anomaly, previousInvestigations = []) {
    const investigationContext = buildInvestigationContext(
        anomaly,
        previousInvestigations
    )

    const [
        riskAnalysis,
        volatilityAnalysis,
    ] = await Promise.all([
        analyzeRisk(anomaly, investigationContext),
        analyzeVolatility(anomaly, investigationContext),
    ])

    const confidence =
        previousInvestigations.length >= 3
            ? 85
            : previousInvestigations.length >= 1
                ? 75
                : 60

    const rootCause =
        anomaly.type === "PRICE_SPIKE"
            ? "Rapid directional price movement detected with elevated volatility."
            : anomaly.type === "MARKET_REVIEW"
                ? "Routine market review triggered for trend assessment."
                : "Market behaviour deviated from expected baseline."

    return {
        rootCause,
        confidence,
        investigation: buildFinalInvestigation(
            anomaly,
            riskAnalysis,
            volatilityAnalysis,
            previousInvestigations
        ),
        riskAnalysis,
        volatilityAnalysis,
        memoryMatches: previousInvestigations.length,
        dataUsed: {
            anomaly,
            previousInvestigationIds: previousInvestigations.map((item) => {
                return item._id
            }),
        },
    }
}
module.exports = {
    orchestrateInvestigation,
    buildInvestigationContext,
}

