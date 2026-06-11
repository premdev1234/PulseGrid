import Header from "../components/Header"
import useMarketSocket from "../hooks/useMarketSocket"
import StatusBanner from "../components/StatusBanner"
import MetricsBar from "../components/MetricsBar"

export default function Dashboard() {
    useMarketSocket()

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Header />

            <main className="p-6">
                <StatusBanner />
                <MetricsBar />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold">
                        TEST
                    </h1>
                </div>
            </main>
        </div>
    )
}
