import type { Metadata } from "next";
import { Manrope, Noto_Sans_KR, Playfair_Display } from "next/font/google";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "마블링 B2B | 사업자 맞춤형 서비스 허브",
  description: "사업자를 위한 맞춤형 서비스 허브",
  authors: [{ name: "박동규", url: "https://dong99u.github.io/" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "마블링 B2B",
    title: "마블링 B2B | 사업자 맞춤형 서비스 허브",
    description: "사업자를 위한 맞춤형 서비스 허브",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "마블링 B2B | 사업자 맞춤형 서비스 허브",
    description: "사업자를 위한 맞춤형 서비스 허브",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${manrope.variable} ${notoSansKR.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
