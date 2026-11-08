"use client";

import { FriendlyError } from "../components/error-boundary";
import { THEME_INIT_SCRIPT } from "../lib/theme-init";
import { STANDALONE_ERROR_STYLES } from "../lib/standalone-error-theme";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en" suppressHydrationWarning><head><link rel="stylesheet" href="/site-background.css?v=charcoal-grain" /><style>{STANDALONE_ERROR_STYLES}</style><script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /></head><body><FriendlyError retry={reset} /></body></html>;
}
