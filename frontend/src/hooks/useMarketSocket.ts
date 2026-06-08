import { useEffect } from "react"

import socket from "../websocket/socket"

import { useMarketStore, } from "../store/marketStore"

export default function useMarketSocket() {
    const updateQuote = useMarketStore((state) => state.updateQuote)
    const addAlert = useMarketStore((state) => state.addAlert)
    const addInvestigation = useMarketStore((state) => state.addInvestigation)
    useEffect(()=>{
        socket.on("connect",() => {
            console.log("Connect to websocket")
        })

        socket.on("quote_update" , (data) => {
            console.log("Recieved QUote:", data)

            updateQuote(data)
        })
        socket.on("anomaly_detected" , (data) => {
            console.log("ALERT EVENT:", data)

            addAlert(data)
        })
        socket.on("investigation_completed" , (data) => {
            addInvestigation(data)
        })
        return () => {
            socket.off("quote_update")
            socket.off("anomaly_detected")
            socket.off("investigation_completed")
        }
    } , [updateQuote, addAlert, addInvestigation])
}
