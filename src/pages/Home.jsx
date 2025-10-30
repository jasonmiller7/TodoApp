// src/pages/Home.jsx
import React from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import useSettings from "../context/useSettings";
import useTodos from "../context/useTodos";

function Home() {
  const { darkMode, fontSize } = useSettings();
  const { todos, dispatch } = useTodos();
  return (
    <section
      className={`flex flex-col items-center min-h-screen px-4 py-10 font-press ${fontSize} ${
        darkMode ? "bg-ps2black text-ps2gray" : "bg-white text-ps2black"
      }`}
    >
      <h1 className="text-3xl md:text-4xl text-ps2blue mb-6 text-center drop-shadow-[0_0_6px_rgba(0,51,160,0.8)]">
        TODO QUEST
      </h1>

      <p className="text-sm md:text-base text-center max-w-md mb-10">
        Welcome, Player. Your mission: complete your daily quests with precision
        and pride.
      </p>

      <div className="w-full space-y-4">
        <TodoInput />
        <TodoList />
        { todos.length > 0 &&
        <div className="flex justify-center">
          <button
            onClick={() => dispatch({ type: "CLEAR_ALL" })}
            className="bg-red-700 w-1/4 p-2 text-white rounded font-press hover:bg-red-500 transition shadow-lg"
          >
            Clear All Quests
          </button>
        </div>
        }
      </div>
    </section>
  );
}

export default Home;
