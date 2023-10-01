import { PropsWithChildren } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export type I18nProviderProps = {
  locale: string;
} & PropsWithChildren;

export const I18nProvider: React.FC<I18nProviderProps> = async ({
  children,
  locale,
}) => {
  let messages;

  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
