import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* ----------------------------
   CUSTOM SWISS 721 FONT
-----------------------------*/
const swiss = localFont({
  src: [
    {
      path: "../public/fonts/Swiss 721 BT.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Swiss-721-bt-bold-condensed.ttf",
      weight: "700",
      style: "bold",
    },
    // {
    //   path: "../public/fonts/Swiss-721BT-BoldCondensedItalic.ttf",
    //   weight: "700",
    //   style: "italic",
    // },
  ],
  variable: "--font-swiss",
  display: "swap",
});

const raleway = localFont({
  src: [
    {
      path: "../public/fonts/Raleway Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Raleway Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Raleway SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-raleway",
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
    <html lang="en" className={swiss.variable}>
      <body className="font-[var(--font-swiss)] bg-background text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
