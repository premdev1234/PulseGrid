const { generateAnalysis, } = require("../services/geminiClient")

async function analyzeVolatility(anomaly, investigationContext) {
    const prompt = `
You are a volatility strategist.
Analyze this anomaly from a market volatility perspective.

Current anomaly:
${JSON.stringify(anomaly, null, 2)}

Investigation context:
${investigationContext}

Rules:
- Ground every claim in the current anomaly or historical context.
- Distinguish observed movement from likely explanation.
- Mark uncertainty when data is incomplete.
- Do not recommend trades or destructive actions.

Return concise bullets for:
- Volatility expansion
- Momentum behavior
- Market regime signal
- Evidence used
- Uncertainty
- Recommended monitoring action
`
    try {
        return await generateAnalysis(prompt)
    } catch (err) {
        console.error(
            "Volatility agent failed:",
            err.response?.data ||
            err.message
        )
        return "Volatility analysis unavailable."
    }
}
module.exports = {
    analyzeVolatility,
}
