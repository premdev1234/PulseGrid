/*
backend-to-backend AI orchestration.
*/ 
const axios = require("axios")

async function triggerInvestigation(anomaly){
    try {
        const response = await  axios.post(
            "http://localhost:5000/investigate",
            anomaly
        )
        return response.data.investigation
    } catch (err) {
        console.error(
            "Agent trigger failed:",
            err.message
        )
        return null
    }
}
module.exports = { triggerInvestigation, }