import {
    useEffect,
    useRef,
} from "react"

import { useMarketStore } from "../store/marketStore"

export default function InvestigationPanel() {

    const panelRef =
        useRef<HTMLElement | null>(null)

    const investigations =
        useMarketStore(
            (state) => state.investigations
        )

    const latest =
        investigations[0]

    useEffect(() => {

        if (latest) {

            panelRef.current?.scrollIntoView({
                behavior: "smooth",
            })

        }

    }, [latest])

    return (

        <section
            ref={panelRef}
            className="mt-6"
        >

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold">
                    Agent Investigation
                </h2>

                <span className="text-sm text-slate-400">
                    {investigations.length} stored
                </span>

            </div>

            <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800 p-4">

                {!latest && (
                    <p className="text-sm text-slate-400">
                        Select a symbol or run a demo scenario to start an investigation.
                    </p>
                )}

                {latest && (
                    <>

                        <div className="flex flex-wrap items-center justify-between gap-3">

                            <div>

                                <p className="font-semibold">
                                    {latest.symbol}
                                </p>

                                <p className="text-sm text-slate-400">
                                    {latest.type} · {latest.severity}
                                </p>

                            </div>

                            <span className="text-xs text-slate-400">
                                {new Date(
                                    latest.timestamp
                                ).toLocaleTimeString()}
                            </span>

                        </div>

                        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-slate-950 p-4 text-sm leading-6 text-slate-200">
                            {latest.investigation}
                        </pre>

                    </>
                )}

            </div>

        </section>
    )
}