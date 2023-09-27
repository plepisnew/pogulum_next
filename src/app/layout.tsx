"use client";

import "@/assets/styles/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import { trpc } from "@/utils/trpc";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { useThemeStore } from "@/stores/themeStore";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/i18n";
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
        <I18nextProvider i18n={i18n}>
          <Header />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </I18nextProvider>
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
