import type { Metadata } from "next"
import localFont from "next/font/local"
import { Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

/* =========================================================
   LOCAL FONTS (LINUX / NETLIFY SAFE)
   Files must EXIST exactly with same casing
   Location: /public/fonts/
========================================================= */

const swiss = localFont({
  src: [
    {
      path: "../public/fonts/Swiss721BT-BoldCondensed.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Swiss721BT-BoldCondensedItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-swiss",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-raleway",
  display: "swap",
});

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Intokine",
  description: "For your body, mind, and lifestyle",
  icons: {
    icon: "/images/favIcon.png",
  },
}

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${swiss.variable} ${raleway.variable}`}
    >
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
