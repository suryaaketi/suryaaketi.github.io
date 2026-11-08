// Global/server error pages may render without the application stylesheet.
export const STANDALONE_ERROR_STYLES = `
  :root{color-scheme:dark;--paper:#0b0b0a;--ink:#f2eee4;--muted:#bbb5a7;--blue:#e2c16d;--peach:#f1d99b;--line:#4b4330;--panel:#151512;--on-accent:#171407}
  *{box-sizing:border-box}body{margin:0;padding:1rem;background:var(--paper);color:var(--ink);font:1rem/1.7 system-ui,sans-serif;overflow-wrap:anywhere}
  .recovery-panel{max-width:40rem;margin:10vh auto;padding:1.5rem;border:1px solid var(--line);border-radius:1rem;background:var(--panel)}
  .recovery-panel h1{font-size:clamp(1.75rem,6vw,2.5rem);line-height:1.2;color:var(--peach);margin:0 0 1rem}.recovery-panel p{margin:0 0 1rem}
  .recovery-panel a,.recovery-panel button{display:inline-flex;align-items:center;justify-content:center;min-height:2.75rem;min-width:2.75rem;padding:.65rem .75rem;color:var(--blue);font:inherit;border-radius:.5rem;transition:transform .12s ease}
  .recovery-panel button{border:0;background:var(--blue);color:var(--on-accent);cursor:pointer}.recovery-panel a:focus-visible,.recovery-panel button:focus-visible{outline:2px solid var(--blue);outline-offset:3px}.recovery-panel a:active,.recovery-panel button:active{transform:scale(.98)}
  .recovery-actions{display:flex;flex-wrap:wrap;gap:.75rem}
  @media(prefers-reduced-motion:reduce){.recovery-panel a,.recovery-panel button{transition:none;transform:none}}
`;
