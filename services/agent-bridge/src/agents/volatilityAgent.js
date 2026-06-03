const axios = require("axios")

const MODEL_NAME = "gemini-3.5-flash"
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`

async function analyzeVolatility(anomaly, historicalContext
) {
    const prompt = `
You are a volatility strategist.
Analyze this anomaly from a market volatility perspective.
Symbol:${anomaly.symbol}
Type:${anomaly.type}
Severity:${anomaly.severity}
Percent Change:${anomaly.percentChange}
Historical Context:${historicalContext}
Focus on:
- volatility expansion,
- momentum behavior,
- market regime,
- directional strength.
`
    try {
        const response =
            await axios.post(
                GEMINI_URL,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }
            )
        return response.data.candidates[0].content.parts[0].text
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