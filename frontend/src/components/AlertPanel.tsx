import { useState } from "react"
import toast from "react-hot-toast"

import { useMarketStore } from "../store/marketStore"

export default function AlertPanel() {

    const [loadingId, setLoadingId] =
        useState<number | null>(null)

    const alerts = useMarketStore(
        (state) => state.alerts
    )

    const addInvestigation = useMarketStore(
        (state) => state.addInvestigation
    )

    async function investigate(id: number) {

        try {

            setLoadingId(id)

            toast.loading(
                "Running investigation...",
                {
                    id: String(id),
                }
            )

            const response =
                await fetch(
                    `http://localhost:4000/investigations/${id}`,
                    {
                        method: "POST",
                    }
                )

            const result =
                await response.json()

            console.log(
                "Investigation Result:",
                result
            )

            if (result.investigation) {

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
                })

                toast.success(
                    "Investigation completed",
                    {
                        id: String(id),
                    }
                )
            }

        } catch (err) {

            console.error(
                "Investigation failed:",
                err
            )

            toast.error(
                "Investigation failed",
                {
                    id: String(id),
                }
            )

        } finally {

            setLoadingId(null)

        }
    }

    return (
        <section className="mt-6">

            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Alert Feed
                </h2>

                <span className="text-sm text-slate-400">
                    {alerts.length} active
                </span>
            </div>

            <div className="mt-3 space-y-3">

                {alerts.length === 0 && (
                    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-sm text-slate-400">
                        Waiting for anomaly alerts.
                    </div>
                )}

                {alerts.map((alert) => (

                    <div
                        key={`${alert.symbol}-${alert.type}-${alert.timestamp}`}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-4"
                    >

                        <div className="flex flex-wrap items-center justify-between gap-3">

                            <div>
                                <p className="font-semibold">
                                    {alert.symbol}
                                </p>

                                <p className="text-sm text-slate-400">
                                    {alert.type}
                                </p>
                            </div>

                            <span className="rounded-md border border-amber-400/40 px-2 py-1 text-xs font-semibold text-amber-300">
                                {alert.severity}
                            </span>

                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-300">

                            <span>
                                Move: {alert.percentChange ?? 0}%
                            </span>

                            <span>
                                Price: {alert.price ?? "n/a"}
                            </span>

                        </div>

                        <div className="mt-3 flex justify-end">

                            <button
                                className="
                                    rounded-md
                                    bg-cyan-500
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-slate-950
                                    hover:bg-cyan-400
                                    disabled:opacity-50
                                "
                                disabled={
                                    loadingId === alert.id
                                }
                                onClick={() =>
                                    investigate(alert.id!)
                                }
                            >
                                {
                                    loadingId === alert.id
                                        ? "Investigating..."
                                        : "Investigate"
                                }
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    )
}