import { TransKey } from "@/i18n/utils";
import { ReactNode } from "react";

export type SectionDefinition = {
  Content: ReactNode;
  titleKey: TransKey;
  span: number;
};

export type UseSection<TData = undefined> = TData extends undefined
  ? [SectionDefinition]
  : [SectionDefinition, TData];
