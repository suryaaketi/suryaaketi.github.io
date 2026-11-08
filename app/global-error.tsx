"use client";

import { FriendlyError } from "../components/error-boundary";
import { STANDALONE_ERROR_STYLES } from "../lib/standalone-error-theme";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><head><meta name="color-scheme" content="dark" /><link rel="stylesheet" href="/site-background.css?v=charcoal-grain" /><style>{STANDALONE_ERROR_STYLES}</style></head><body><FriendlyError retry={reset} /></body></html>;
}
