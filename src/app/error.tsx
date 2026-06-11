"use client";

import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <section className="max-w-lg w-full text-center glass rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-sm text-slate-300 mb-4">We couldn't load your dashboard data.</p>

        {process.env.NODE_ENV !== 'production' && (
          <pre className="text-xs text-red-300 mb-4 text-left overflow-auto p-2 rounded bg-black/20">{String(error?.message)}</pre>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Retry
          </button>
        </div>
      </section>
    </main>
  );
}
