function initializeSocket(io){
    io.on("connection",(socket) =>{
        console.log(`Socket connected: ${socket.id}`)

        socket.on("subscribe:symbol",(symbol) =>{
            socket.join(symbol)
            console.log(`${socket.id} subscribed to ${symbol}`)
        })

        socket.on("disconnect",()=>{
            console.log(`Socket disconnected : ${socket.id}`)
        })
    })
}

module.exports = {
    initializeSocket,
}