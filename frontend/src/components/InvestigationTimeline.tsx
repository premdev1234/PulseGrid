import { useMarketStore } from "../store/marketStore"

export default function InvestigationTimeline() {

    const history =
        useMarketStore(
            state =>
                state.investigationHistory
        )

    return (

        <section className="mt-6">

            <h2 className="text-lg font-semibold">
                Investigation Timeline
            </h2>

            <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800 p-4">

                {
                    history.slice(0, 20).map(
                        (item) => (

                            <div
                                key={item.id}
                                className="
                                    mb-4
                                    border-l-2
                                    border-cyan-500
                                    pl-4
                                "
                            >

                                <div className="font-medium">
                                    {item.symbol}
                                </div>

                                <div className="text-sm text-slate-400">
                                    {item.type}
                                </div>

                                <div className="text-xs text-slate-500">
                                    {
                                        new Date(
                                            item.timestamp
                                        ).toLocaleString()
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