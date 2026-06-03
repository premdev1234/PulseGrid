const express = require("express")
const router = express.Router()

const { investigateAnomaly, } = require("../services/geminiService")

router.post("/" , async(req,res) => {
    const anomaly =  req.body
    const investigation = await investigateAnomaly(anomaly)
    res.json({
        investigation,
    })
})
module.exports = router