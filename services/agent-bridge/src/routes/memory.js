const express = require("express")

const router = express.Router()

const {
    getRecentInvestigations,
} = require("../services/memoryService")

router.get("/:symbol", async (req, res) => {

    try {

        const memory =
            await getRecentInvestigations(
                req.params.symbol
            )

        res.json(memory)

    } catch (err) {

        console.error(
            "Memory route error:",
            err
        )

        res.status(500).json({
            error: "Failed to load memory",
        })
    }
})

module.exports = router