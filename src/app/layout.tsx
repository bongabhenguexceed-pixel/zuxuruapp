import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "BONGA BHENGU OS", description: "Personal brand and business operating system" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
