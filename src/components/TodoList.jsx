// src/components/TodoList.jsx
import React, { useState } from 'react';
import useTodos from '../context/useTodos';
import useSettings from '../context/useSettings';

function TodoList() {
  const { todos, dispatch } = useTodos();
  const { darkMode, fontSize } = useSettings();
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState('');


  if (todos.length === 0) {
    return (
      <p className={`text-center mt-6 font-press ${fontSize} ${darkMode ? 'text-ps2gray' : 'text-ps2black'}`}>
        No quests yet. Begin your journey.
      </p>
    );
  }

  return (
    <ul className={`mt-6 space-y-3 ${fontSize}`}>
      {todos.map((todo) => (
        editID === todo.id ? (
          <li
            key={todo.id}
            className={`flex justify-between items-center px-4 py-2 rounded font-press ${
              darkMode ? 'bg-gray-700 text-ps2gray' : 'bg-gray-200 text-ps2black'
            }`}
          >
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow mr-2 p-1 rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const trimmedText = editText.trim();
                  if (trimmedText) {
                    dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, text: trimmedText } });
                    setEditID(null);
                    setEditText('');
                  }
                }}
                className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-800"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditID(null);
                  setEditText('');
                }}
                className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </li>
        ) : (
          <li
            key={todo.id}
            className={`flex w-full justify-between items-center px-4 py-2 rounded font-press ${
              darkMode ? 'bg-gray-700 text-ps2gray' : 'bg-gray-200 text-ps2black'
            } ${todo.done ? 'opacity-50' : ''}`}
          >
            <span className={`${todo.done ? 'line-through':'' }`}>{todo.text}</span>
            <div className="flex gap-2">
              {!todo.done && (
                <button
                  onClick={() => {
                    setEditID(todo.id);
                    setEditText(todo.text);
                  }}
                  className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-800"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                className={`text-xs px-2 py-1 rounded ${
                  todo.done
                    ? 'bg-yellow-600 text-white hover:bg-yellow-800'
                    : 'bg-blue-900 text-white hover:bg-blue-600'
                }`}
              >
                {todo.done ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        )
      ))}
    </ul>
  );
}

export default TodoList;
