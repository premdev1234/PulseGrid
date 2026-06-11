/*
backend-to-backend AI orchestration.
*/ 
const axios = require("axios")

async function triggerInvestigation(anomaly){
    try {
        const response = await axios.post(
            "http://agent-bridge:5000/investigate",
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
