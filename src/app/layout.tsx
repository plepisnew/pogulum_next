"use client";
import "@/app/index.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import { trpc } from "@/utils/trpc";
import { Header, HeaderLayout } from "@/components/adhoc/Header";
import { Footer } from "@/components/adhoc/Footer";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pogulum",
  description: "Pogulum: Twitch Clip Scraper",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <HeaderLayout>{children}</HeaderLayout>
        <Footer />
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
