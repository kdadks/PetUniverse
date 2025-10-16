import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import { CurrencyProvider } from "@/lib/useCurrency";
import GlossyHeader from "@/components/ui/glossy-header";
import GlossyFooter from "@/components/ui/glossy-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pet Universe - One-Stop Pet Care",
  description: "Your comprehensive digital marketplace for pet care, grooming, veterinary services, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <CurrencyProvider>
            <GlossyHeader />
            <div className="pt-16">
              {children}
            </div>
            <GlossyFooter />
          </CurrencyProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
