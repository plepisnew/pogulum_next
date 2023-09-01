import { MouseEventHandler, RefObject, useEffect } from "react";

export type UseClickAway = (options: {
  refs: RefObject<HTMLElement | null>[];
  handler: (e: MouseEvent) => void;
}) => void;

export const useClickAway: UseClickAway = ({ refs, handler }) => {
  useEffect(() => {
    const clickEventHandler = (e: MouseEvent) => {
      const clickedElement = e.target;
      const targetElements = refs.map((ref) => ref.current);

      for (const target of targetElements) {
        if (
          !(clickedElement instanceof Node) ||
          target?.contains(clickedElement)
        ) {
          return;
        }
      }

      handler(e);
    };

    document.addEventListener("click", clickEventHandler);

    return () => document.removeEventListener("click", clickEventHandler);
  }, [refs, handler]);
};
