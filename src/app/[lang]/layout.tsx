"use client";

import "@/assets/styles/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
const font = Manrope({ subsets: ["latin"] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Pogulum</title>
        <meta name="description" content="Pogulum: Twitch Clip Scraper" />
      </head>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default trpc.withTRPC(RootLayout);
