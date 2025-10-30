import { useState, useEffect, useMemo } from 'react';

function useSearch(items, key = 'text', debounceDelay = 1000) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => clearTimeout(timeout);
  }, [query, debounceDelay]);

  const filteredItems = useMemo(() => {
    const lower = debouncedQuery.toLowerCase();
    return items.filter(item => item[key]?.toLowerCase().includes(lower));
  }, [items, debouncedQuery, key]);

  return { query, setQuery, filteredItems };
}

export default useSearch;
