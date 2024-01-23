import type { Metadata } from "next";
import { Azeret_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { switchThemeDuration } from "@/constants";
import { Web3Providers } from "./web3-providers";
import Navbar from "./Navbar";

const inter = Azeret_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "necstar",
  description: "Lukas Hall Testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-50 dark:bg-[#0d1117] ${switchThemeDuration}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3Providers>
            <Navbar />
            <main>{children}</main>
          </Web3Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
