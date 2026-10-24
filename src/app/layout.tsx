import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme/theme-provider";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { TechnicalBackdrop } from "@/components/ui/technical-backdrop";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { site } from "@/lib/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// The editorial serif carries display and prose; Inter does UI; mono carries
// metadata. Three families, same as before — Newsreader replaced the
// display sans, which is what moved this from "techy" to "document".
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Guna R · Cloud / DevOps";
const description =
  "Guna R builds backend applications and the infrastructure they run on. Three projects, written up with their architecture, the decisions behind them, and the problems that came up.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Guna R",
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides `scroll-behavior: smooth` during
      // navigation. Without this attribute every route change animates a
      // long scroll instead of jumping, while in-page anchors still glide.
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top" className="min-h-screen bg-canvas text-ink" suppressHydrationWarning>
        <a
          href="#main-content"
          className="t-meta sr-only rounded-sm bg-clay px-4 py-2 text-clay-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <TechnicalBackdrop />
          <RevealObserver />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
