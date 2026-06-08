const express = require("express")

const router = express.Router()

const { getAnomaliesById, } = require("../services/anomalyService")
const {triggerInvestigation,} = require("../services/agentTriggerService")
const {saveInvestigation,getInvestigationByAnomaly,} = require("../services/investigationService")

router.post("/:id",async(req,res)=> {
    try {
        console.log("Investigation requested:", req.params.id)
        const anomaly = await getAnomaliesById(req.params.id)
        console.log("Anomaly found:", anomaly)

        if(!anomaly){
            return res.status(404).json({
                error: "Anomaly not Found",
            })
        }

        const existing = await getInvestigationByAnomaly(
            anomaly.symbol,
            anomaly.anomaly_type
        )
        if(existing){
            return res.json({
                cached: true,
                investigation:existing,
            })
        }

        const report = await triggerInvestigation({
            symbol:anomaly.symbol,
            type: anomaly.anomaly_type,
            severity: anomaly.severity,
        })
        if(!report){
            return res.status(500).json({
                error: "Investigation failed",
            })
        }

        console.log("Agent response:", report)

        const saved =
            await saveInvestigation({
                symbol: anomaly.symbol,
                type: anomaly.anomaly_type,
                severity: anomaly.severity,
                investigation: report,
            })

        res.json({
            cached: false,
            investigation: saved,
        })
    } catch(err){
        console.error("Investigation route error:", err)
        res.status(500).json({
            
            error: "Investigation failed",
        })
    }
})

module.exports = router