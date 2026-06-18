import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary that silently catches WebGL/Three.js context lost errors
 * during React Router navigation. Prevents the entire app from crashing
 * when the 3D canvas unmounts.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Silently suppress WebGL context lost errors during navigation
    console.warn("[CanvasErrorBoundary] Caught error during unmount:", error.message);
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state if children change (re-navigating to home)
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Don't render the broken canvas
    }
    return this.props.children;
  }
}
