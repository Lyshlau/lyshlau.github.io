"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h2 className="font-serif text-2xl text-olive mb-2">Something went wrong</h2>
      <p className="text-sm text-charcoal/50 mb-6">
        The app hit an unexpected error. Try refreshing.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-2xl bg-olive text-white text-sm font-medium"
      >
        Try again
      </button>
    </div>
  );
}
