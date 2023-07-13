import { useEffect, useRef } from "react";

function useInfinityScroll(addFetchFn: AddFetchFn) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([e], observer) => {
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          await addFetchFn();
          observer.observe(e.target);
        }
      },
      { threshold: 1 }
    );
    observer.observe(targetRef.current as Element);
    return () => observer.disconnect();
  }, [targetRef.current]);

  return targetRef;
}

export default useInfinityScroll;

type AddFetchFn = () => Promise<unknown>;
