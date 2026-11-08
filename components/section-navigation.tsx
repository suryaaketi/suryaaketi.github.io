"use client";

import { useEffect, useState } from "react";
import { portfolioSections, type PortfolioSection } from "../data/section-navigation";
import "./section-navigation.css";

export function useActivePortfolioSection() {
  const [activeSection, setActiveSection] = useState<PortfolioSection>("overview");

  useEffect(() => {
    // The skills boundary returns the nested coursework section to About.
    const targets = [...portfolioSections.map(section => section.id), "skills"]
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * .25, 180);
      let current: PortfolioSection = "overview";
      let closest = -Infinity;
      for (const target of targets) {
        const top = target.getBoundingClientRect().top;
        if (top <= marker && top >= closest) {
          closest = top;
          current = target.id === "skills" ? "about" : target.id as PortfolioSection;
        }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = "contact";
      setActiveSection(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    if (document.getElementById("main")) resizeObserver.observe(document.getElementById("main")!);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return activeSection;
}

export default function SectionNavigation({ activeSection, resumeUrl }: { activeSection: PortfolioSection; resumeUrl: string }) {
  return <nav className="section-rail" aria-label="Section shortcuts">
    <span className="rail-caption">Jump to</span>
    {portfolioSections.map(section => <a className="rail-link" key={section.id} href={`#${section.id}`}
      aria-label={section.label} aria-current={activeSection === section.id ? "location" : undefined} aria-describedby={`shortcut-${section.id}`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={section.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>{section.label}</span><span className="rail-note" id={`shortcut-${section.id}`} role="tooltip">{section.note}</span>
    </a>)}
    <a className="rail-link rail-resume" href={resumeUrl} download>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>Résumé</span>
    </a>
  </nav>;
}
