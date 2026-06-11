import Header from "../components/Header"
import StatusBanner from "../components/StatusBanner"
import MetricsBar from "../components/MetricsBar"
import MarketFeed from "../components/MarketFeed"
import MarketCharts from "../components/MarketCharts"
import useMarketSocket from "../hooks/useMarketSocket"
import { useMarketStore } from "../store/marketStore"

export default function Dashboard() {
    useMarketSocket()

    const selectedSymbol =
        useMarketStore(
            (state) => state.selectedSymbol
        )

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            <Header />

            <main className="p-6">

                <StatusBanner />

                <MetricsBar />

                <MarketFeed />
                <MarketCharts />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold">
                        TEST
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Selected Symbol:
                        {" "}
                        {selectedSymbol}
                    </p>
                </div>

            </main>

        </div>
    )
}
