import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "../components/error-boundary";
import { THEME_INIT_SCRIPT } from "../lib/theme-init";

export const metadata: Metadata = {
  title: "Surya Aketi | Computer Science & Machine Learning",
  description: "The projects and experience of Surya Aketi: Penn State computer science, machine learning research, and useful tools for the desktop.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><link rel="stylesheet" href="/site-background.css?v=charcoal-grain" /><script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /></head>
      <body className="antialiased"><ErrorBoundary>{children}</ErrorBoundary></body>
    </html>
  );
}
