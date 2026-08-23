import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { site } from "@/data/site";
import { getDictionary, type Locale } from "@/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function currentLocale(): Promise<Locale> {
  const headerStore = await headers();
  return headerStore.get("x-locale") === "pt" ? "pt" : "en";
}

export const viewport: Viewport = {
  themeColor: "#071B33",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  const path = locale === "pt" ? "/pt" : "/";

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "pt_BR",
      alternateLocale: locale === "en" ? ["pt_BR"] : ["en_US"],
      url: path,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.jpg"],
    },
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": "/pt",
        en: "/",
      },
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await currentLocale();

  return (
    <html
      lang={locale === "en" ? "en" : "pt-BR"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-sans text-navy">{children}</body>
    </html>
  );
}
