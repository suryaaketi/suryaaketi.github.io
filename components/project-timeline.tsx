"use client";

import { useEffect, useRef } from "react";
import type { BuildTimeline } from "../data/portfolio";
import "./project-timeline.css";

export default function ProjectTimeline({ timeline }: { timeline?: BuildTimeline }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const valid = timeline && Number.isFinite(timeline.months) && timeline.months >= 0
    && Number.isInteger(timeline.referenceMonths) && timeline.referenceMonths > 0
    && timeline.referenceMonths <= 120 && timeline.months <= timeline.referenceMonths;
  const share = valid ? timeline.months / timeline.referenceMonths : 0;
  const offset = 100 - share * 100;

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!container || !progress || !progress.animate || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let animation: Animation | undefined;
    function configureMotion() {
      observer?.disconnect();
      animation?.cancel();
      if (reducedMotion.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          animation?.cancel();
          if (entry.isIntersecting) animation = progress!.animate(
            [{ strokeDashoffset: 100 }, { strokeDashoffset: offset }],
            { duration: 1400, easing: "cubic-bezier(.22,1,.36,1)" },
          );
        }
      }, { threshold: 0 });
      observer.observe(container!);
    }
    configureMotion();
    reducedMotion.addEventListener("change", configureMotion);
    return () => {
      observer?.disconnect();
      animation?.cancel();
      reducedMotion.removeEventListener("change", configureMotion);
    };
  }, [offset, valid]);

  if (!valid) return null;
  const { months, referenceMonths } = timeline;
  const unit = months === 1 ? "month" : "months";
  const label = `Build duration: ${months} ${unit} out of a ${referenceMonths}-month reference period (${(share * 100).toFixed(2)}%).`;

  return <div className="project-timeline" ref={containerRef}>
    <div className="project-timeline-ring" role="img" aria-label={label}>
      <svg viewBox="0 0 128 128" fill="none" aria-hidden="true">
        <g className="project-timeline-ticks">{Array.from({ length: referenceMonths }, (_, index) =>
          <path key={index} d="M64 3v4" transform={`rotate(${index * 360 / referenceMonths} 64 64)`} />,
        )}</g>
        <circle className="project-timeline-track" cx="64" cy="64" r="48" />
        <circle ref={progressRef} className="project-timeline-progress" cx="64" cy="64" r="48" pathLength="100"
          strokeDasharray="100" strokeDashoffset={offset} transform="rotate(-90 64 64)" />
      </svg>
      <div className="project-timeline-value" aria-hidden="true"><strong>{months}<span>/{referenceMonths}</span></strong><span>{unit}</span></div>
    </div>
    <div className="project-timeline-copy"><span className="project-timeline-label">Build timeline</span><p>{months} {unit} of building.<br />Within a {referenceMonths}-month reference period.</p></div>
  </div>;
}
