import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { GhlVoiceWidgetLoader } from "@/components/ui/ghl-voice-widget-loader";
import { brand } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${brand.name} — AI Voice Agents Built on GoHighLevel`,
  description: brand.tagline,
  metadataBase: new URL(`https://${brand.domain}`),
  openGraph: {
    title: `${brand.name} — AI Voice Agents Built on GoHighLevel`,
    description: brand.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — AI Voice Agents Built on GoHighLevel`,
    description: brand.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-(--color-bg) text-(--color-fg)">
        <SmoothScrollProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <GhlVoiceWidgetLoader />
      </body>
    </html>
  );
}
