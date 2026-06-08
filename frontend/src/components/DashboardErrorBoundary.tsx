import { Component, type ErrorInfo, type ReactNode, } from "react"

interface Props {
    children: ReactNode
}

interface State {
    errorMessage: string | null
}

export default class DashboardErrorBoundary extends Component<Props, State> {
    state: State = {
        errorMessage: null,
    }

    static getDerivedStateFromError(error: Error) {
        return {
            errorMessage: error.message,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(
            "Dashboard render failed:",
            error,
            errorInfo
        )
    }

    render() {
        if (this.state.errorMessage) {
            return (
                <div className="rounded-lg border border-red-400/40 bg-red-950/40 p-4 text-red-100">
                    <h2 className="text-lg font-semibold">
                        Dashboard render failed
                    </h2>
                    <p className="mt-2 text-sm">
                        {this.state.errorMessage}
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}
