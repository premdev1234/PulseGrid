import { useEffect, useState } from "react"
import { API_BASE_URL } from "../config"

interface MemoryEntry {
    investigation: string
    createdAt: string

    anomaly: {
        symbol: string
        type: string
        severity: string
    }
}

export default function MemoryBrowser(
    {
        symbol,
    }: {
        symbol: string
    }
) {

    const [memory, setMemory] =
        useState<MemoryEntry[]>([])

    useEffect(() => {

        if (!symbol) return

        loadMemory()

    }, [symbol])

    async function loadMemory() {

        try {

            const response =
                await fetch(
                    `http://`${API_BASE_URL}/memory/${symbol}`
                )

            const data =
                await response.json()

            setMemory(data)

        } catch (err) {

            console.error(err)

        }
    }

    return (

        <section className="mt-6">

            <h2 className="text-lg font-semibold">
                Previous Similar Events
            </h2>

            <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800 p-4">

                {
                    memory.length === 0 &&
                    (
                        <p className="text-slate-400 text-sm">
                            No memory found.
                        </p>
                    )
                }

                {
                    memory.map(
                        (entry, index) => (

                            <div
                                key={index}
                                className="
                                    mb-3
                                    rounded-lg
                                    border
                                    border-slate-700
                                    p-3
                                "
                            >

                                <div className="font-medium">
                                    {
                                        entry.anomaly.symbol
                                    }
                                </div>

                                <div className="text-xs text-slate-400">
                                    {
                                        entry.anomaly.type
                                    }
                                </div>

                                <div className="text-xs text-slate-500">
                                    {new Date(entry.createdAt).toLocaleString()}
                                </div>

                                <div className="mt-2 text-xs text-slate-300 line-clamp-3">
                                    {entry.investigation}
                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </section>
    )
}
