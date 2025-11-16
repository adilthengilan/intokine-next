import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google"; // You can replace Inter with any Google font
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* ----------------------------
   FONT CONFIGURATION
-----------------------------*/

// Google Font: Raleway (Light + SemiBold)
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-raleway",
  display: "swap",
});

// Google Font: Swiss (use closest available Google font if Swiss721 not on Google)
const swiss = Inter({ // you can replace 'Inter' with a closer font like 'Roboto' or 'IBM Plex Sans'
  subsets: ["latin"],
  weight: ["700"], // bold
  variable: "--font-swiss",
  display: "swap",
});

/* ----------------------------
   SITE METADATA
-----------------------------*/
export const metadata: Metadata = {
  title: "Intokine",
  description: "For your body, mind, and lifestyle",
  icons: { icon: "/images/favIcon.png" },
};

/* ----------------------------
   ROOT LAYOUT
-----------------------------*/
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${swiss.variable}`}>
      <body className="font-[var(--font-raleway)] bg-background text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
