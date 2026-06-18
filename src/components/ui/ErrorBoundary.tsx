import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in React tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Return null or empty fragment to prevent rendering the broken tree,
      // but since we wrap the Routes, if Routes crashes, we need to recover.
      // Wait, if it crashes on unmount, we can just reset the error state!
      // But standard ErrorBoundaries stay broken until reset.
      // We will provide a simple auto-recovery mechanism.
      setTimeout(() => this.setState({ hasError: false }), 100);
      return null;
    }

    return this.props.children;
  }
}
