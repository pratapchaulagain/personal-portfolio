import { hasLocale, NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/providers/theme-provider"

import "../globals.css"
import { cn } from "@/lib/utils"
import { Manrope, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Metadata } from "next"
import siteConfig from "@/lib/site"
import { AudioProvider } from "@/components/providers/audio-provider"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const fontManrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

const notoSans = Noto_Sans({
  subsets: ["devanagari"],
  variable: "--font-sans",
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`/og.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  // setRequestLocale(locale)

  const fontClass = locale === "np" ? notoSans.variable : manrope.variable

  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(
          "antialiased",
          fontClass,
          notoSansDevanagari.variable,
          fontManrope.variable
        )}
      >
        <body>
          <NextIntlClientProvider>
            <ThemeProvider>
              <TooltipProvider>
                <AudioProvider>{children}</AudioProvider>
              </TooltipProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}
