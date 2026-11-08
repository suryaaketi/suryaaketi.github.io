export const portfolioSections = [
  { id: "overview", label: "Overview", note: "A quick introduction", icon: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-7h6v7" },
  { id: "work", label: "Projects", note: "Mac apps & software architecture", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { id: "research", label: "Research", note: "Computer vision at Penn State", icon: "m9 3 6 6-4 4-6-6 4-4ZM14 8l3-3M6 12a7 7 0 1 0 12 5M12 13v4M4 21h16" },
  { id: "experience", label: "Experience", note: "Penn State & Wyntek internships", icon: "M9 7V4h6v3M3 7h18v14H3zM3 12l9 4 9-4M12 12v4" },
  { id: "about", label: "About", note: "Background, skills & learning", icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2" },
  { id: "coursework", label: "Courses", note: "Computer science, math & systems", icon: "m2 8 10-5 10 5-10 5L2 8ZM6 10v7c4 3 8 3 12 0v-7M22 8v9" },
  { id: "contact", label: "Contact", note: "Get in touch & view the résumé", icon: "M3 5h18v14H3zM3 5l9 8 9-8" },
] as const;

export type PortfolioSection = typeof portfolioSections[number]["id"];
