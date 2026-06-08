const { generateAnalysis, } = require("../services/geminiClient")

async function analyzeRisk(anomaly, investigationContext) {
    const prompt = `
You are a quantitative risk analyst.
Analyze the anomaly from a systemic market risk perspective.

Current anomaly:
${JSON.stringify(anomaly, null, 2)}

Investigation context:
${investigationContext}

Rules:
- Ground every claim in the current anomaly or the provided historical context.
- If evidence is missing, say what is missing instead of inventing a cause.
- Clearly mark uncertainty.
- Do not recommend trades or destructive actions.

Return concise bullets for:
- Risk severity
- Liquidation or contagion risk
- Evidence used
- Uncertainty
- Recommended monitoring action
`
    try {
        return await generateAnalysis(prompt)
    } catch (err) {
        console.error(
            "Risk agent failed:",
            err.response?.data ||
            err.message
        )
        return "Risk analysis unavailable."
    }
}
module.exports = {
    analyzeRisk,
}
