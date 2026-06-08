const express = require("express")
const router = express.Router()

const { investigateAnomaly, } = require("../services/geminiService")

router.post("/" , async(req,res) => {
    try {
        const anomaly =  req.body
        const investigation = await investigateAnomaly(anomaly)

        res.json({
            investigation,
        })
    } catch (err) {
        console.error(
            "Investigation route failed:",
            err.message
        )
        res.status(500).json({
            error: "Investigation failed",
        })
    }
})
module.exports = router
