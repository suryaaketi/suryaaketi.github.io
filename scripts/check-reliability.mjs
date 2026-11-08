import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";

const projectRoot = new URL("../", import.meta.url);
const asModuleUrl = source => "data:text/javascript;base64," + Buffer.from(source).toString("base64");
const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const loadFile = name => fs.readFile(new URL(name, projectRoot), "utf8");
const themeStylesSource = compile(await loadFile("lib/standalone-error-theme.ts"));
const policySource = compile(await loadFile("worker/response-policy.ts"))
  .replace('"../lib/standalone-error-theme"', JSON.stringify(asModuleUrl(themeStylesSource)));
const { applyResponsePolicy, friendlyFailure } = await import(asModuleUrl(policySource));
const request = (pathname, init) => new Request("https://portfolio.test" + pathname, init);
const response = (type, init = {}) => new Response("sample", { ...init, headers: { "Content-Type": type, ...init.headers } });

for (const pathname of ["/_next/static/chunks/page-Abcd1234.js", "/_next/static/css/page.XQD9Tju7.css"]) {
  const result = applyResponsePolicy(request(pathname), response(pathname.endsWith("css") ? "text/css" : "text/javascript"));
  assert.equal(result.headers.get("Cache-Control"), "public, max-age=31536000, immutable");
}
for (const pathname of ["/", "/?section=about", "/private.html"]) {
  const result = applyResponsePolicy(request(pathname), response("text/html", { headers: { "CDN-Cache-Control": "public,max-age=3600", "Cache-Tag": "page" } }));
  assert.equal(result.headers.get("Cache-Control"), "private, no-store");
  assert.equal(result.headers.get("CDN-Cache-Control"), null);
  assert.equal(result.headers.get("Cache-Tag"), null);
}
const cookieResult = applyResponsePolicy(request("/_next/static/chunks/page-Abcd1234.js"), response("text/javascript", { headers: { "Set-Cookie": "example=1", "Cache-Control": "public,max-age=31536000" } }));
assert.equal(cookieResult.headers.get("Cache-Control"), "private, no-store");
for (const [req, type] of [
  [request("/?_rsc=example", { headers: { RSC: "1" } }), "application/octet-stream"],
  [request("/?_rsc=example"), "text/x-component; charset=utf-8"],
  [request("/_next/static/chunks/page-Abcd1234.js", { headers: { RSC: "1" } }), "text/javascript"],
]) {
  const result = applyResponsePolicy(req, response(type, { headers: { "Cache-Control": "public,max-age=3600", "CDN-Cache-Control": "public,max-age=86400", "Cloudflare-CDN-Cache-Control": "public,max-age=86400", "Cache-Tag": "private-rsc" } }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("Cache-Control"), "private, no-store");
  assert.equal(result.headers.get("CDN-Cache-Control"), null);
  assert.equal(result.headers.get("Cloudflare-CDN-Cache-Control"), null);
  assert.equal(result.headers.get("Cache-Tag"), null);
}
const missingResult = applyResponsePolicy(request("/_next/static/chunks/page-Abcd1234.js"), response("text/javascript", { status: 404 }));
assert.equal(missingResult.headers.get("Cache-Control"), "private, no-store");
const resumeResult = applyResponsePolicy(request("/Surya_Aketi_Resume.pdf"), response("application/pdf"));
assert.notEqual(resumeResult.headers.get("Cache-Control"), "public, max-age=31536000, immutable");

const htmlFailure = friendlyFailure(request("/", { headers: { Accept: "text/html" } }));
assert.equal(htmlFailure.status, 503);
assert.equal(htmlFailure.headers.get("Cache-Control"), "private, no-store");
const errorHtml = await htmlFailure.text();
assert.match(errorHtml, /Reload portfolio/);
assert.match(errorHtml, /Download résumé/);
assert.match(errorHtml, /mailto:suryaaketi@gmail.com/);
assert.doesNotMatch(errorHtml, /stack|Error:|exception|traceback/i);
assert.match(errorHtml, /:root\{color-scheme:dark/);
assert.match(errorHtml, /<meta name="color-scheme" content="dark">/);
assert.doesNotMatch(errorHtml, /surya\.portfolio\.theme|data-theme="light"|prefers-color-scheme/);
const rscFailure = friendlyFailure(request("/?rsc", { headers: { Accept: "*/*", RSC: "1" } }));
assert.equal(rscFailure.headers.get("Content-Type"), "text/plain; charset=utf-8");
assert.equal(await rscFailure.text(), "This content is temporarily unavailable. Please try again.");
assert.equal(await friendlyFailure(request("/", { method: "HEAD", headers: { Accept: "text/html" } })).text(), "");
const headWithoutAccept = friendlyFailure(request("/", { method: "HEAD" }));
assert.equal(headWithoutAccept.status, 503);
assert.equal(headWithoutAccept.headers.get("Content-Type"), "text/plain; charset=utf-8");
assert.equal(await headWithoutAccept.text(), "");

const dataSource = compile(await loadFile("data/portfolio.ts"));
const dataUrl = asModuleUrl(dataSource);
const data = await import(dataUrl);
const fallbackSource = compile(await loadFile("scripts/portfolio-fallback.ts")).replace('"../data/portfolio"', JSON.stringify(dataUrl));
const { renderPortfolioFallback } = await import(asModuleUrl(fallbackSource));
const initialHtml = renderPortfolioFallback();
for (const project of data.projects) assert.ok(initialHtml.includes(project.title), `Missing initial project: ${project.title}`);
for (const job of data.experience) assert.ok(initialHtml.includes(job.company), `Missing initial experience: ${job.company}`);
assert.match(initialHtml, /href="\.\/Surya_Aketi_Resume\.pdf"/);
assert.match(initialHtml, /mailto:suryaaketi@gmail.com/);
for (const stream of data.researchStudy.workstreams) assert.ok(initialHtml.includes(`id="initial-research-${stream.id}"`), `Missing no-script research topic: ${stream.title}`);
assert.doesNotMatch(initialHtml, /<(?:pre|code)\b/i);
assert.match(initialHtml, /<details>/);
assert.doesNotMatch(initialHtml, /<form|<input|spinner/i);
console.log("PASS: safe caching, private-page handling, friendly errors, HEAD responses, and complete no-script portfolio content.");
