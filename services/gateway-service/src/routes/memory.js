const express = require("express")
const axios = require("axios")

const router = express.Router()

router.get("/:symbol", async (req, res) => {

    try {

        const response =
            await axios.get(
                `http://agent-bridge:5000/memory/${req.params.symbol}`
            )

        res.json(response.data)

    } catch (err) {

        console.error(
            "Memory proxy failed:",
            err.message
        )

        res.status(500).json({
            error: "Memory fetch failed",
        })
    }
})

module.exports = router