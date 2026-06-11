import {
    useEffect,
    useState,
} from "react"

import {
    useMarketStore,
} from "../store/marketStore"

import { API_BASE_URL } from "../config"

export default function InvestigationHistory() {

    const [loading, setLoading] =
        useState(true)

    const history =
        useMarketStore(
            state =>
                state.investigationHistory
        )

    const setHistory =
        useMarketStore(
            state =>
                state.setInvestigationHistory
        )

    const setSelected =
        useMarketStore(
            state =>
                state.setSelectedInvestigation
        )

    const [search, setSearch] =
        useState("")

    useEffect(() => {

        loadHistory()

    }, [])

    async function loadHistory() {

        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/investigations`
                )

            const data =
                await response.json()

            setHistory(data)

        } catch (err) {

            console.error(err)

        } finally {

            setLoading(false)

        }
    }
    <input
        type="text"
        placeholder="Search symbol..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        className="
        mt-3
        w-full
        rounded-lg
        border
        border-slate-700
        bg-slate-800
        px-3
        py-2
        text-sm
    "
    />
    const filtered = history.filter(
        (investigation) => investigation.symbol.toLowerCase().includes(
            search.toLowerCase()
        )
    )

    return (

        <section className="mt-6">

            <h2 className="text-lg font-semibold">
                Investigation History
            </h2>

            <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800">

                {loading && (
                    <div className="p-4">
                        Loading...
                    </div>
                )}

                {
                    filtered.map(
                        (investigation) => (

                            <div
                                key={
                                    investigation.id
                                }
                                className="
                                    cursor-pointer
                                    border-b
                                    border-slate-700
                                    p-3
                                    hover:bg-slate-700
                                "
                                onClick={() =>
                                    setSelected(
                                        investigation
                                    )
                                }
                            >

                                <div className="font-medium">
                                    {
                                        investigation.symbol
                                    }
                                </div>

                                <div className="text-xs text-slate-400">
                                    {
                                        investigation.type
                                    }
                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </section>
    )
}
