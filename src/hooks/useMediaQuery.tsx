// import { useEffect, useState } from "react";

// const useMediaQuery = (query: string) => {
//   const [matches, setMatches] = useState(false);

//   useEffect(() => {
//     const mediaQueryList = window.matchMedia(query);
//     const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

//     setMatches(mediaQueryList.matches);
//     mediaQueryList.addEventListener("change", listener);

//     return () => mediaQueryList.removeEventListener("change", listener);
//   }, [query]);

//   return matches;
// };

// export default useMediaQuery;

import { useEffect, useState } from "react";

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false;
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export { useMediaQuery };
