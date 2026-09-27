import {Component, type ErrorInfo, type ReactNode} from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError() {
        return {hasError: true}
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // @ TODO - send to sentry
        console.error(error, info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <h1>Something wrong</h1>
        }

        return this.props.children
    }
}
