import React from "react";
import useTodos from '../context/useTodos';
import useSettings from '../context/useSettings';
import useSearch from '../hooks/useSearch.js';

function Search() {
  const { todos } = useTodos();
  const { darkMode, fontSize } = useSettings();
  const { query, setQuery, filteredItems: filteredTodos } = useSearch(todos);

  if (todos.length === 0) {
    return (
      <section
        className={`min-h-screen flex flex-col items-center px-4 py-10 font-press ${fontSize} ${
          darkMode ? 'bg-ps2black text-ps2gray' : 'bg-white text-ps2black'
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">Search Quests</h1>
        <p className="text-center text-sm">No quests available to search. Please add some quests first.</p>
      </section>
    );
  }

  return (
    <section
      className={`min-h-screen flex flex-col items-center px-4 py-10 font-press ${fontSize} ${
        darkMode ? 'bg-ps2black text-ps2gray' : 'bg-white text-ps2black'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Search Quests</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your quests here..."
        className={`w-1/2 p-2 mb-6 rounded font-press ${
          darkMode ? 'bg-gray-700 text-ps2gray placeholder-ps2gray' : 'bg-gray-200 text-ps2black placeholder-ps2black'
        } focus:outline-none focus:ring-2 focus:ring-ps2blue`}
      />

      {filteredTodos.length === 0 ? (
        <p className="text-center text-sm">No quests match your search.</p>
      ) : (
        <ul className="space-y-3 max-w-xl mx-auto">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`px-4 py-2 rounded ${
                darkMode ? 'bg-gray-700 text-ps2gray' : 'bg-gray-200 text-ps2black'
              } font-press ${todo.done ? 'line-through opacity-50' : ''}`}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Search;  

