// src/context/TodoProvider.jsx
import { useReducer, useEffect } from "react";
import TodoContext from "./TodoContext";


const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const now = Date.now();
      return [
        ...state,
        {
          id: now,
          text: action.payload,
          done: false,
          priority: "low",
          starred: false,
          createdAt: now,
          doneAt: null,
        },
      ];
    }

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              done: !todo.done,
              doneAt: !todo.done ? Date.now() : null
            }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "CLEAR_ALL":
      return [];
    case "CLEAR_DONE":
      return state.filter((todo) => !todo.done);
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case "SET_PRIORITY":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, priority: action.payload.priority }
          : todo
      );
    case "REORDER_TODOS":
      return [...action.payload];
    case "TOGGLE_STAR":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, starred: !todo.starred } : todo
      );
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
export { TodoProvider };
