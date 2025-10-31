// src/pages/Completed.jsx
import React, { useMemo } from "react";
import useTodos from "../context/useTodos";
import useSettings from "../context/useSettings";

function Completed() {
  const { todos, dispatch } = useTodos();
  const { darkMode, fontSize } = useSettings();

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.done),
    [todos]
  );
  const completed = todos.filter((todo) => todo.done);
  return (
    <section
      className={`min-h-screen px-4 py-10 font-press ${fontSize} ${
        darkMode ? "bg-ps2black text-ps2gray" : "bg-white text-ps2black"
      }`}
    >
      <h2 className="text-2xl text-ps2blue mb-6 text-center drop-shadow-[0_0_6px_rgba(0,51,160,0.8)]">
        Completed Quests
      </h2>

      {completedTodos.length === 0 ? (
        <p className="text-center text-sm">
          No quests completed yet. Keep going.
        </p>
      ) : (
        <ul className="space-y-3 max-w-xl mx-auto">
          {completedTodos.map((todo) => (
            <>
              <li
                key={todo.id}
                className={`px-4 py-2 rounded ${
                  darkMode
                    ? "bg-gray-700 text-ps2gray"
                    : "bg-gray-200 text-ps2black"
                } font-press opacity-50`}
              >
                {todo.text}
                <p className="text-xs mt-2 italic text-gray-500 ">
                  Quest received:{" "}
                  {new Date(todo.createdAt).toLocaleDateString()},{" "}
                  {new Date(todo.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-xs italic text-gray-500 ">
                  Quest completed: {new Date(todo.doneAt).toLocaleDateString()},{" "}
                  {new Date(todo.doneAt).toLocaleTimeString()}
                </p>
              </li>
            </>
          ))}
        </ul>
      )}
      {completed.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => dispatch({ type: "CLEAR_DONE" })}
            className="bg-red-700 w-80 mt-10 p-2 text-white rounded font-press hover:bg-red-500 transition shadow-lg"
          >
            Clear All Quests
          </button>
        </div>
      )}
    </section>
  );
}

export default Completed;
