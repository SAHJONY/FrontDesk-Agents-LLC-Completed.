"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Hook into Sentry/etc later if you want
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
            <p className="text-sm text-red-200 font-semibold">Something failed to load.</p>
            <p className="text-xs text-red-200/70 mt-2 break-words">
              {this.state.error?.message ?? "Unknown error"}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
