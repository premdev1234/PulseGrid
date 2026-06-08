const axios = require("axios")

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite"
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`

function extractText(response) {
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No model response returned."
}

async function generateAnalysis(prompt) {
    if (!process.env.GEMINI_API_KEY) {
        return "Gemini analysis unavailable: GEMINI_API_KEY is not configured."
    }

    const response = await axios.post(
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

    return extractText(response)
}

module.exports = {
    generateAnalysis,
}
