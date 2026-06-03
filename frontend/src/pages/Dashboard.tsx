import Header from "../components/Header"
import MarketFeed from "../components/MarketFeed" 
import useMarketSocket from "../hooks/useMarketSocket" 

export default function Dashboard() {
  useMarketSocket()
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-semibold">
          Market Intelligence Dashboard
        </h2>
        <MarketFeed />
      </main>
    </div>
  )
}
