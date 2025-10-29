// import { useState, useMemo } from 'react';
// function useSearch(items, key='text') {
//   const [query, setQuery] = useState('');
    
//   const filteredTodos = useMemo(() => {
//     const lowerQuery = query.toLowerCase();
//     return todos.filter(todo => todo.text.toLowerCase().includes(lowerQuery));
//   }, [items, query, key]);
//     return { query, setQuery, filteredTodos };
// }
// export default useSearch;

import { useState, useMemo } from 'react';

function useSearch(items, key = 'text') {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item[key].toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query, key]);

  return { query, setQuery, filteredItems };
}

export default useSearch;


