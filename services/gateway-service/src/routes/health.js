const express = require("express") // imports express library
const router = express.Router()

router.get("/" , (req , res) => {
    res.json({
        service: "gateway-service" ,
        status: "healthy",
    })
})

module.exports = router

