"use client";

import "@/assets/styles/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/i18n";
import { ThemeProvider } from "next-themes";
const font = Manrope({ subsets: ["latin"] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <html lang="en">
      <head>
        <title>Pogulum</title>
        <meta name="description" content="Pogulum: Twitch Clip Scraper" />
      </head>
      <body className={font.className}>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <Header />
            <PageContainer>{children}</PageContainer>
            <Footer />
            {mounted && <></>}
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
