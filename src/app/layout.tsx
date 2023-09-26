"use client";

import "@/assets/styles/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import { trpc } from "@/utils/trpc";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { useThemeStore } from "@/stores/themeStore";

const font = Manrope({ subsets: ["latin"] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLightMode } = useThemeStore();

  return (
    <html lang="en" className={isLightMode ? "light" : "dark"}>
      <head>
        <title>Pogulum</title>
        <meta name="description" content="Pogulum: Twitch Clip Scraper" />
      </head>
      <body className={font.className}>
        <Header />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
