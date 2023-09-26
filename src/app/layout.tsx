"use client";

import "@/app/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import { trpc } from "@/utils/trpc";
import { Header, HeaderLayout } from "@/components/adhoc/Header";
import { Footer } from "@/components/adhoc/Footer";

const font = Manrope({ subsets: ["latin"] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Pogulum</title>
        <meta name="description" content="Pogulum: Twitch Clip Scraper" />
      </head>
      <body className={font.className}>
        <Header />
        <HeaderLayout>{children}</HeaderLayout>
        <Footer />
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
