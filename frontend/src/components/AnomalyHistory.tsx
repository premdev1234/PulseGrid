import {
    useEffect,
    useState,
} from "react"

import { useMarketStore } from "../store/marketStore"
import { API_BASE_URL } from "../config"

interface HistoricalAnomaly {
    id: number
    symbol: string
    anomaly_type: string
    severity: string
    created_at: string
}

export default function AnomalyHistory() {

    const [anomalies, setAnomalies] =
        useState<HistoricalAnomaly[]>([])

    const addInvestigation =
        useMarketStore(
            (state) => state.addInvestigation
        )

    useEffect(() => {

        loadAnomalies()

    }, [])

    async function loadAnomalies() {

        try {

            const response =
                await fetch(
                    "${API_BASE_URL}/anomalies"
                )

            const data =
                await response.json()

            setAnomalies(data)

        } catch (err) {

            console.error(
                "Failed loading anomalies",
                err
            )

        }
    }

    async function investigate(
        id: number
    ) {

        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/investigations/${id}`,
                    {
                        method: "POST",
                    }
                )

            const result =
                await response.json()

            if (
                result.investigation
            ) {

                addInvestigation({
                    symbol:
                        result.investigation.symbol,

                    type:
                        result.investigation.anomaly_type,

                    severity:
                        result.investigation.severity,

                    timestamp:
                        Date.now(),

                    investigation:
                        result.investigation.investigation,
                    
                    rootCause:
                        result.investigation.rootCause,

                    confidence:
                        result.investigation.confidence,
                })
            }

        } catch (err) {

            console.error(
                "Investigation failed",
                err
            )

        }
    }

// return (
//     <section className="mt-6">

//         <h2 className="text-lg font-semibold">
//             Recent Anomalies
//         </h2>

//         <p className="text-red-400">
//             Count: {anomalies.length}
//         </p>

//         <pre className="text-xs">
//             {JSON.stringify(anomalies[0], null, 2)}
//         </pre>

//     </section>
// )
    return (

        <section className="mt-6">

            <h2 className="text-lg font-semibold">
                Recent Anomalies
            </h2>

            <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800">

                {anomalies.slice(0, 20).map(
                    (anomaly) => (

                        <div
                            key={anomaly.id}
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-700
                                p-3
                            "
                        >

                            <div>

                                <div className="font-medium">
                                    {anomaly.symbol}
                                </div>

                                <div className="text-xs text-slate-400">
                                    {anomaly.anomaly_type}
                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <span className="text-xs text-slate-400">
                                    {anomaly.severity}
                                </span>

                                <button
                                    className="
                                        rounded-md
                                        bg-cyan-500
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-slate-950
                                    "
                                    onClick={() =>
                                        investigate(
                                            anomaly.id
                                        )
                                    }
                                >
                                    Investigate
                                </button>

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>

    )
}
