import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* ----------------------------
   FONT CONFIGURATION
-----------------------------*/

// Google Font: Raleway (Light + SemiBold)
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "600"], // 300 = Light, 600 = SemiBold
  variable: "--font-raleway",
});

// Local Font: Swiss721BT Bold Condensed
// Place your font file inside /public/fonts/Swiss721BT.woff2
const swiss721 = {
  variable: "--font-swiss",
  style: { fontFamily: "Swiss721BT, sans-serif" },
};

/* ----------------------------
   SITE METADATA
-----------------------------*/
export const metadata: Metadata = {
  title: "Intokine",
  description: "For your body, mind, and lifestyle",
  icons: { icon: "./images/favIcon.png" },
};

/* ----------------------------
   ROOT LAYOUT
-----------------------------*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${swiss721.variable}`}
    >
      <head>
        <style>{`
          /* Local Swiss721BT Font */
          @font-face {
            font-family: 'Swiss721BT';
            src: url('/fonts/Swiss721BT.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>

      <body className="font-[var(--font-raleway)] bg-background text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
