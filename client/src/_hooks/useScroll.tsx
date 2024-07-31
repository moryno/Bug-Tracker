import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScroll = () => {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (!scrollRef?.current) return;
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef?.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);
  
  return {
    scrollRef,
    scrollToTop,
    scrollToBottom,
  };
};
