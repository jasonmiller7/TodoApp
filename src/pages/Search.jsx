import React from "react";
import useTodos from "../context/useTodos";
import useSettings from "../context/useSettings";
import useSearch from "../hooks/useSearch.js";

function highlightMatch(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1 || query.trim() === "") return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="bg-yellow-300">{text.slice(index, index + query.length)}</span>
      {text.slice(index + query.length)}
    </>
  );
}

function Search() {
  const { todos } = useTodos();
  const { darkMode, fontSize } = useSettings();
  const { query, setQuery, filteredItems: filteredTodos } = useSearch(todos);

  const sectionStyle = `min-h-screen flex flex-col items-center px-4 py-10 font-press ${fontSize} ${
    darkMode ? "bg-ps2black text-ps2gray" : "bg-white text-ps2black"
  }`;

  if (todos.length === 0) {
    return (
      <section className={sectionStyle}>
        <h1 className="text-3xl font-bold mb-6">Search Quests</h1>
        <p className="text-center text-sm">No quests available to search. Please add some quests first.</p>
      </section>
    );
  }

  return (
    <section className={sectionStyle}>
      <h1 className="text-3xl font-bold mb-6">Search Quests</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your quests here..."
        className={`w-1/2 p-2 mb-6 rounded font-press ${
          darkMode
            ? "bg-gray-700 text-ps2gray placeholder-ps2gray"
            : "bg-gray-200 text-ps2black placeholder-ps2black"
        } focus:outline-none focus:ring-2 focus:ring-ps2blue`}
      />

      {filteredTodos.length === 0 ? (
        <p className="text-center text-sm">No quests match your search.</p>
      ) : (
        <ul className="space-y-3 max-w-xl mx-auto w-full">
          {filteredTodos.map((todo) => {
            const createdAt = new Date(todo.createdAt);
            const formattedDate = createdAt.toLocaleDateString();
            const formattedTime = createdAt.toLocaleTimeString();

            return (
              <li
                key={todo.id}
                className={`fade-in px-4 py-2 rounded ${
                  darkMode ? "bg-gray-700 text-ps2gray" : "bg-gray-200 text-ps2black"
                } font-press ${todo.done ? "line-through opacity-50" : ""}`}
              >
                <p className="mb-1">{highlightMatch(todo.text, query)}</p>
                <p className="text-xs text-gray-500 italic">
                  Added on {formattedDate} at {formattedTime}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Search;
