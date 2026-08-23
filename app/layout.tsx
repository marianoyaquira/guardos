import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  return headerStore.get("x-locale") === "en" ? "en" : "pt";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        "pt-BR": "/",
        en: "/en",
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
