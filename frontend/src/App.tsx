import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className = "text-4xl font-bold">
        DashBoard
      </h1>
      <Dashboard />
      <p className = "mt-4 text-slate-300">
        Real-time market intelligence platform
      </p>
    </div>
  )
}