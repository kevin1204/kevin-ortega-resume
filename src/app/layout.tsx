import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kevin Ortega Rodriguez - Full Stack Developer & Solutions Architect",
  description: "I architect and build comprehensive digital solutions that drive business growth. Full Stack Developer, Technical Account Manager, and Founder & CEO of WebLoft Studio.",
  keywords: ["full stack developer", "solutions architect", "technical account manager", "react", "nextjs", "nodejs", "system design", "WebLoft Studio"],
  authors: [{ name: "Kevin Ortega Rodriguez" }],
  creator: "Kevin Ortega Rodriguez",
  manifest: "/manifest.json",
  themeColor: "#6b21a8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      { url: "/favicon.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "16x16", type: "image/x-icon" }
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevinortega.me",
    title: "Kevin Ortega Rodriguez - Full Stack Developer & Solutions Architect",
    description: "I architect and build comprehensive digital solutions that drive business growth. Full Stack Developer, Technical Account Manager, and Founder & CEO of WebLoft Studio.",
    siteName: "Kevin Ortega Rodriguez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Ortega Rodriguez - Full Stack Developer & Solutions Architect",
    description: "I architect and build comprehensive digital solutions that drive business growth. Full Stack Developer, Technical Account Manager, and Founder & CEO of WebLoft Studio.",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kevin Ortega Rodriguez",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('dark');
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XLYN6JH1KM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XLYN6JH1KM');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          storageKey="kevin-resume-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
