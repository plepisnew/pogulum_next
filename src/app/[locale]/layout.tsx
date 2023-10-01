import "@/assets/styles/index.css";
import { Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { ClientApp } from "@/components/adhoc/ClientApp";

const font = Manrope({ subsets: ["latin"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export type RootLayoutProps = {
  params: { locale: string };
} & PropsWithChildren;

const RootLayout: React.FC<RootLayoutProps> = async ({
  children,
  params: { locale },
}) => {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Pogulum</title>
        <meta name="description" content="Pogulum: Twitch Clip Scraper" />
      </head>
      <body className={font.className}>
        <I18nProvider locale={locale}>
          <ClientApp>{children}</ClientApp>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
