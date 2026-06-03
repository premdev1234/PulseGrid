require("dotenv").config()
const express = require("express")
const cors = require("cors")
const investigateRoutes = require("./routes/investigate")
const { connectMemory, } = require("./services/memoryService")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/investigate", investigateRoutes)
app.get("/", (req, res) => {
    res.json({
        status:
            "PulseGrid Agent Bridge Running",
    })
})
const PORT = process.env.PORT || 5000
async function startServer() {
    try {
        await connectMemory()
        app.listen(PORT, () => {
            console.log(
                `Agent bridge listening on port ${PORT}`
            )
        })
    } catch (err) {
        console.error(
            "Startup failed:",
            err
        )
    }
}
startServer()