import { Dispatch, SetStateAction } from "react";

export type PropsWithClassName = {
  className: string;
};

export type ArrayMap<TSource extends any, TDestination extends any> = (
  source: TSource,
  index: number
) => TDestination;

export type ArrayFilter<TSource extends any> = (
  source: TSource,
  index: number
) => boolean;

export type ArrayForEach<TSource extends any> = (
  source: TSource,
  index: number
) => void;

export type Setter<T> = Dispatch<SetStateAction<T>>;
