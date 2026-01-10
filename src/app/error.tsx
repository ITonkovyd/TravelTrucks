"use client";

import { useEffect } from "react";
import Link from "next/link";
import css from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Oops!</h1>
      <h2 className={css.subtitle}>Something went wrong</h2>
      <p className={css.message}>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className={css.actions}>
        <button onClick={() => reset()} className="button button--primary">
          Try again
        </button>
        <Link href="/" className={`button button--secondary ${css.link}`}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
