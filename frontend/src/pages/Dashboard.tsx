import Header from "../components/Header"
import useMarketSocket from "../hooks/useMarketSocket"
import { useMarketStore, } from "../store/marketStore"
import StatusBanner from "../components/StatusBanner"
import MetricsBar from "../components/MetricsBar"
{/* import AlertPanel from "../components/AlertPanel"
import InvestigationPanel from "../components/InvestigationPanel"
import MarketCharts from "../components/MarketCharts"
import MarketFeed from "../components/MarketFeed"
import AnomalyHistory from "../components/AnomalyHistory"
import InvestigationHistory from "../components/InvestigationHistory"
import InvestigationTimeline from "../components/InvestigationTimeline"
import MemoryBrowser from "../components/MemoryBrowser"
import { API_BASE_URL } from "../config"
*/}

const symbols = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "AAPL",
]

const demoScenarios = [
  {
    id: "price-spike",
    label: "Price Spike",
  },
  {
    id: "spread-widening",
    label: "Spread Widening",
  },
  {
    id: "stale-feed",
    label: "Stale Feed",
  },
]

export default function Dashboard() {
  useMarketSocket()
  const selectedSymbol = useMarketStore((state) => state.selectedSymbol)
  const setSelectedSymbol = useMarketStore((state) => state.setSelectedSymbol)

  const addInvestigation = useMarketStore(
    (state) => state.addInvestigation
  )


  async function investigateSelectedSymbol() {

    const response =
      await fetch(
        `${API_BASE_URL}/investigations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: selectedSymbol,
          }),
        }
      )

    const result =
      await response.json()

    if (result.investigation) {

      addInvestigation({
        symbol: result.investigation.symbol,
        type: result.investigation.anomaly_type,
        severity: result.investigation.severity,
        timestamp: Date.now(),
        investigation: result.investigation.investigation,
        rootCause: result.investigation.rootCause,
        confidence: result.investigation.confidence,
      })
    }
  }


  async function runDemoScenario(scenario: string) {
    await fetch(
      `${API_BASE_URL}/demo/${scenario}`,
      {
        method: "POST",
      }
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="p-6">
        <StatusBanner />
        <MetricsBar />
        {/* <SystemStatus /> */}
        {/* <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              Market Intelligence Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Live anomaly detection with agent-backed incident memory.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
              value={selectedSymbol}
              onChange={(event) => setSelectedSymbol(event.target.value)}
            >
              {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <button
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              type="button"
              onClick={investigateSelectedSymbol}
            >
              Investigate
            </button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {demoScenarios.map((scenario) => (
            <button
              key={scenario.id}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
              type="button"
              onClick={() => runDemoScenario(scenario.id)}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <MarketFeed />
        <MarketCharts />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">

          <div>
            <AlertPanel />
          </div>

          <div>
            <InvestigationPanel />
            <MemoryBrowser symbol={selectedSymbol} />
          </div>

        </div>

        <InvestigationHistory />

        <InvestigationTimeline />
        <AnomalyHistory /> */}
      <h1>TEST</h1>
      </main>
    </div>
  )
}
