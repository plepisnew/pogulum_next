export type PropsWithClassName = {
  className: string;
};

export type ArrayMap<TSource extends any, TDestination extends any> = (
  source: TSource,
  index: number
) => TDestination;
