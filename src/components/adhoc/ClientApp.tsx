"use client";

import { PropsWithChildren } from "react";
import { Header, PageContainer, Footer } from "@/components/adhoc/PageLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { trpc } from "@/utils/trpc";
import { NextComponentType } from "next";
import { BaseContext, NextPageContext } from "next/dist/shared/lib/utils";

export const ClientApp: NextComponentType<
  NextPageContext,
  {},
  PropsWithChildren
> = trpc.withTRPC(({ children }) => {
  return (
    <ThemeProvider>
      <Header />
      <PageContainer>{children}</PageContainer>
      <Footer />
    </ThemeProvider>
  );
});
