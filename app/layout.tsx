import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scheduling Demo",
  description: "Appointment Scheduling App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      
        <link rel="manifest" href="/manifest.json" />

     
        <link rel="icon" href="/icon-192.png" />

 
        <meta name="theme-color" content="#0EA5E9" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

  
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/sw.js")
                  .then(() => console.log("Service Worker Registered"))
                  .catch((err) => console.log("SW registration failed:", err));
              }
            `,
          }}

          
        />
      </body>
    </html>
  );
}
