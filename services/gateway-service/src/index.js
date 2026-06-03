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
const app = express()
app.use(cors())
app.use(express.json())
app.use("/health" , healthRoutes)
app.use("/publish", publishRoutes)
app.use("/quotes", quoteRoutes)
const server = http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : "*" ,
    },
})
app.get("/" , (req , res) => {
    res.json({
        status : "Gateway service running " , 
    })
}) // rest api
initializeSocket(io)
const PORT = process.env.PORT || 4000
connectRedis()
connectPostgres()
startSubscriber(io)
server.listen(PORT , () => {
    console.log(`Gateway service listening on port ${PORT}`)
}) // starts server ( HTTP + websocket)

