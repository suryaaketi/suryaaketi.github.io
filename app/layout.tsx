import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "../components/error-boundary";

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
    <html lang="en">
      <head><link rel="stylesheet" href="/site-background.css?v=charcoal-grain" /><meta name="color-scheme" content="dark" /></head>
      <body className="antialiased"><ErrorBoundary>{children}</ErrorBoundary></body>
    </html>
  );
}
