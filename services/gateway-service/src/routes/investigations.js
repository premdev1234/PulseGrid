const express = require("express")

const router = express.Router()

const { getAnomaliesById, } = require("../services/anomalyService")
const {triggerInvestigation,} = require("../services/agentTriggerService")
const {
    saveInvestigation,
    getInvestigationByAnomaly,
    getAllInvestigations,
    getInvestigationById,
} = require("../services/investigationService")

router.get("/", async (req, res) => {

    try {

        const investigations =
            await getAllInvestigations()

        res.json(investigations)

    } catch (err) {

        res.status(500).json({
            error: "Failed loading investigations",
        })

    }
})

router.get("/:id", async (req, res) => {

    try {

        const investigation =
            await getInvestigationById(
                req.params.id
            )

        if (!investigation) {

            return res.status(404).json({
                error: "Investigation not found",
            })
        }

        res.json(investigation)

    } catch (err) {

        res.status(500).json({
            error: "Failed loading investigation",
        })

    }
})

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
                investigation: report.investigation,
                rootCause: report.rootCause,
                confidence: report.confidence,
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

router.post("/", async (req, res) => {

    try {

        const { symbol } = req.body

        const report =
            await triggerInvestigation({
                symbol,
                type: "MARKET_REVIEW",
                severity: "INFO",
            })

        await saveInvestigation({
            symbol,
            type: "MARKET_REVIEW",
            severity: "INFO",
            investigation: report.investigation,
            rootCause: report.rootCause,
            confidence: report.confidence,
        })

        res.json({
            investigation: {
                symbol,
                anomaly_type: "MARKET_REVIEW",
                severity: "INFO",
                investigation: report.investigation,
                rootCause: report.rootCause,
                confidence: report.confidence,
            }
        })

    } catch (err) {

        res.status(500).json({
            error: "Investigation failed"
        })

    }
})


module.exports = router