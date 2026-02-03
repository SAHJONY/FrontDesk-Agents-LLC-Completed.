"use client";

import React from "react";

type Props = {
  children: React.ReactNode;

  /** Static fallback UI (simple) */
  fallback?: React.ReactNode;

  /** Render-prop fallback (more flexible) */
  fallbackRender?: (args: {
    error: Error;
    reset: () => void;
  }) => React.ReactNode;

  /** When these change, the boundary auto-resets */
  resetKeys?: Array<string | number | boolean | null | undefined>;

  /** Optional callback when boundary resets */
  onReset?: () => void;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Hook into Sentry/etc later if you want
    console.error("ErrorBoundary caught:", error, info);
  }

  componentDidUpdate(prevProps: Props) {
    const prevKeys = prevProps.resetKeys ?? [];
    const nextKeys = this.props.resetKeys ?? [];

    if (this.state.hasError && prevKeys.length && nextKeys.length) {
      const changed =
        prevKeys.length !== nextKeys.length ||
        prevKeys.some((k, i) => k !== nextKeys[i]);

      if (changed) this.reset();
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      const error = this.state.error ?? new Error("Unknown error");

      if (this.props.fallbackRender) {
        return this.props.fallbackRender({ error, reset: this.reset });
      }

      return (
        this.props.fallback ?? (
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
            <p className="text-sm text-red-200 font-semibold">Something failed to load.</p>
            <p className="text-xs text-red-200/70 mt-2 break-words">
              {error.message}
            </p>
            <button
              type="button"
              onClick={this.reset}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15"
            >
              Retry
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
