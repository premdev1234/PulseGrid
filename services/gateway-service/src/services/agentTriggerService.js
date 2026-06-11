/*
backend-to-backend AI orchestration.
*/ 
const axios = require("axios")

async function triggerInvestigation(anomaly){
    try {
        const response = await axios.post(
            `${process.env.AGENT_BRIDGE_URL}/investigate`,
            anomaly
        )
        return response.data
    } catch (err) {
        console.error(
            "Agent trigger failed:",
            err.message
        )
        return null
    }
}
module.exports = { triggerInvestigation, }
