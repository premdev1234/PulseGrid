const express = require("express")

const router = express.Router()

const { redisClient } = require("../redis/client")

// router.post("/" , async (req , res) =>{
    
router.get("/" , async (req , res) =>{
    const payload = {
        symbol: "AAPL",
        price: 212.44,
        timestamp: Date.now(),
    }

    await redisClient.publish(
        "quotes",
        JSON.stringify(payload)
    )

    res.json({
        message: "Quote Published",
        payload,
    })
})

module.exports = router