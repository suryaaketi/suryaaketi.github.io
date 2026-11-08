import { THEME_INIT_SCRIPT } from "../lib/theme-init";
import { STANDALONE_ERROR_STYLES } from "../lib/standalone-error-theme";

const hashedAsset = /^\/_next\/static\/(?:chunks|css)\/[^?]*[.-][A-Za-z0-9_-]{6,}\.(?:js|css)$/;

export function applyResponsePolicy(request: Request, response: Response) {
  const headers = new Headers(response.headers);
  const contentType = headers.get("Content-Type") || "";
  const isRsc = request.headers.has("RSC") || contentType.toLowerCase().includes("text/x-component");
  if (request.method === "GET" && response.status === 200 && !isRsc && !headers.has("Set-Cookie") && hashedAsset.test(new URL(request.url).pathname) && /(?:javascript|text\/css)/i.test(contentType)) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (isRsc || headers.has("Set-Cookie") || contentType.toLowerCase().includes("text/html") || response.status >= 400) {
    // The portfolio is currently owner-private. Do not cache rendered pages,
    // authenticated navigation, or failures in a shared or offline cache.
    headers.set("Cache-Control", "private, no-store");
    headers.delete("CDN-Cache-Control");
    headers.delete("Cloudflare-CDN-Cache-Control");
    headers.delete("Cache-Tag");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export function friendlyFailure(request: Request) {
  const headers = { "Cache-Control": "private, no-store", "Content-Type": "text/html; charset=utf-8" };
  const isDocument = request.headers.get("Accept")?.includes("text/html") && !request.headers.has("RSC");
  if (!isDocument) return new Response(request.method === "HEAD" ? null : "This content is temporarily unavailable. Please try again.", { status: 503, headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" } });
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Surya Aketi · Try again</title><link rel="stylesheet" href="./site-background.css?v=charcoal-grain"><style>${STANDALONE_ERROR_STYLES}</style><script>${THEME_INIT_SCRIPT}</script></head><body><main class="recovery-panel"><h1>Let’s try that again.</h1><p>The portfolio couldn’t load right now. Please retry, or use the résumé and contact links below.</p><nav class="recovery-actions" aria-label="Recovery options"><a href="./">Reload portfolio</a><a href="./Surya_Aketi_Resume.pdf" download>Download résumé</a><a href="mailto:suryaaketi@gmail.com">Email me</a></nav></main></body></html>`;
  return new Response(request.method === "HEAD" ? null : html, { status: 503, headers });
}
