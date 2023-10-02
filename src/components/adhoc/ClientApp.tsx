"use client";

import { PropsWithChildren } from "react";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { trpc } from "@/utils/trpc";
import { NextComponentType } from "next";
import { NextPageContext } from "next/dist/shared/lib/utils";
import { NextUIProvider } from "@nextui-org/react";

export const ClientApp: NextComponentType<
  NextPageContext,
  {},
  PropsWithChildren
> = trpc.withTRPC(({ children }) => {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <Header />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </ThemeProvider>
    </NextUIProvider>
  );
});
