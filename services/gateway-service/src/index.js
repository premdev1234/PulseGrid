require("dotenv").config()
const express = require("express")
const cors = require("cors")
const healthRoutes = require("./routes/health")
const http = require("http")
const { Server } = require("socket.io")
const { initializeSocket } = require("./websocket/socketHandler")
const { connectRedis } = require("./redis/client")
const publishRoutes = require("./routes/publish")
const { startSubscriber } = require("./redis/subscriber")
const { connectPostgres } = require("./db/postgres")
const quoteRoutes = require("./routes/quotes")
const investigationRoutes = require("./routes/investigations")
const demoRoutes = require("./routes/demo")
const anomalyRoutes = require("./routes/anomalies")
const metricsRoutes = require("./routes/metrics")
const memoryRoutes = require("./routes/memory")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/health" , healthRoutes)
app.use("/publish", publishRoutes)
app.use("/quotes", quoteRoutes)
app.use("/investigations", investigationRoutes)
app.use("/demo", demoRoutes)
app.use("/anomalies",anomalyRoutes)
app.use("/metrics",metricsRoutes)
app.use("/memory",memoryRoutes)

const server = http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : "*" ,
    },
})
app.set("io", io)
app.get("/" , (req , res) => {
    res.json({
        status : "Gateway service running " , 
    })
}) // rest api
initializeSocket(io)
const PORT = process.env.PORT || 4000

async function startServer() {
    try {

        await connectRedis()

        await connectPostgres()

        await startSubscriber(io)

        server.listen(PORT, () => {
            console.log(
                `Gateway service listening on port ${PORT}`
            )
        })

    } catch (err) {

        console.error(
            "Startup failed:",
            err.message
        )

        process.exit(1)
    }
}

startServer()// starts server ( HTTP + websocket)

