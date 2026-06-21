"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
      <h2 className="font-serif text-2xl text-olive font-normal mb-3">
        Something went wrong
      </h2>
      <p className="body-soft mb-10 max-w-xs">
        The app encountered an unexpected moment. Please try again.
      </p>
      <button onClick={reset} className="btn-ghost">
        Try again
      </button>
    </div>
  );
}
