import { useState, useEffect } from "react";

export const useDebounce = (query, delay) => {
  const [debounceQuery, setDebounceQuery] = useState(query);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceQuery(query);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [delay, query]);
  return debounceQuery;
};
