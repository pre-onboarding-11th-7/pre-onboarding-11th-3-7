import { useState, useEffect } from "react";

export const useScroll = () => {
  const [isScrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setScrollEnd(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrollEnd, setScrollEnd };
};
