import { useEffect } from "react"

import socket from "../websocket/socket"

import { useMarketStore, } from "../store/marketStore"

export default function useMarketSocket() {
    const updateQuote = useMarketStore((state) => state.updateQuote)
    useEffect(()=>{
        socket.on("connect",() => {
            console.log("Connect to websocket")
        })

        socket.on("quote_update" , (data) => {
            console.log("Recieved QUote:", data)

            updateQuote(data)
        })
        return () => {
            socket.off("quote_update")
        }
    } , [updateQuote])
}