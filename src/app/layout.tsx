import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import { CurrencyProvider } from "@/lib/useCurrency";
import ConditionalLayout from "@/components/providers/conditional-layout";
import MockDataInitializer from "@/components/providers/mock-data-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "P4Pet - Every Pet. Every Need. Every Professional.",
  description: "Every pet parent deserves access to every service their pet needs, from every trusted professional. Complete pet care ecosystem connecting you with verified veterinarians, groomers, trainers, and premium products—all in one place.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 min-h-screen`}
      >
        <MockDataInitializer />
        <AuthSessionProvider>
          <CurrencyProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </CurrencyProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
