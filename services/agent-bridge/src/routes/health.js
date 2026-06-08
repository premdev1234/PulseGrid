const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        service: "agent-bridge",
        status: "healthy",
    })

})

module.exports = router