import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SJCE-STEP | Premium Startup Incubator & Accelerator",
  description: "SJCE-STEP empowers innovators with world-class mentorship, funding, and resources to build the next generation of groundbreaking startups.",
  keywords: ["startup incubator", "accelerator", "SJCE", "entrepreneurship", "innovation", "funding", "mentorship"],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/SJCE-STEP Logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/SJCE-STEP Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
