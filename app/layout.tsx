import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const editorialFont = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Packers & Movers | Trusted Relocation Services in MP & Maharashtra",
    template: "%s | Packers & Movers",
  },
  description:
    "Verified packers and movers for home shifting, office relocation, car transport and warehousing across Indore, Bhopal, Burhanpur, Khandwa, Jalgaon, Bhusawal, Buldhana & Dhule.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sansFont.variable} ${monoFont.variable} ${editorialFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-foreground selection:bg-proof selection:text-proof-ink">
        <noscript>
          <style>{`[style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}