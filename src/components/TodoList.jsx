import React, { useState } from "react";
import { flushSync } from "react-dom";
import useTodos from "../context/useTodos";
import useSettings from "../context/useSettings";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import confetti from "canvas-confetti";

// function celebrate() {
//   confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { y: 0.6 },
//   });
// }

function TodoList() {
  const { todos, dispatch } = useTodos();
  const { darkMode, fontSize } = useSettings();
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState("");

  const priorities = ["high", "medium", "low"];

  function handleDragEnd(result) {
    if (!result.destination) return;

    const draggedId = result.draggableId;
    const destIndex = result.destination.index;
    const destPriority = result.destination.droppableId;

    // Find the dragged todo
    const draggedTodo = todos.find((t) => t.id.toString() === draggedId);
    if (!draggedTodo) return;

    // Remove it from the full list
    const updatedTodos = todos.filter((t) => t.id.toString() !== draggedId);

    // Insert it at the destination index with updated priority
    const reordered = [...updatedTodos];
    reordered.splice(destIndex, 0, { ...draggedTodo, priority: destPriority });

    // Flush the update immediately so drag layer reflects changes
    flushSync(() => {
      dispatch({ type: "REORDER_TODOS", payload: reordered });
    });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`flex justify-between gap-4 mt-6 px-4 ${fontSize}`}>
        {priorities.map((priority) => {
          const filtered = todos.filter((t) => t.priority === priority);

          const priorityColor = {
            high: "border-red-500",
            medium: "border-yellow-500",
            low: "border-green-500",
          }[priority];

          return (
            <Droppable droppableId={priority} key={priority} type="TODO">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 bg-opacity-10 rounded-lg p-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <h2
                    className={`text-lg font-bold mb-4 uppercase ${priorityColor}`}
                  >
                    {priority} Priority
                  </h2>

                  {filtered.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`fade-in border-2 ${priorityColor} rounded-xl p-4 pb-1 shadow-lg font-press transition-all duration-200 ease-in-out mb-4 select-none ${
                            darkMode
                              ? "bg-gray-800 text-ps2gray"
                              : "bg-gray-100 text-ps2black"
                          } ${todo.done ? "opacity-50" : ""} ${
                            snapshot.isDragging
                              ? "scale-105 shadow-2xl z-50"
                              : ""
                          }`}
                        >
                          <div
                            className="cursor-grab select-none mb-2 hover:text-gray-200"
                            {...provided.dragHandleProps}
                          >
                            <span className="text-xs text-gray-400">
                              ☰ Drag
                            </span>
                          </div>
                          {todo.createdAt && (
                            <>
                              <p className="text-xs italic text-gray-500 mb-2">
                                Quest received:{" "}
                                {new Date(todo.createdAt).toLocaleDateString()},{" "}
                                {new Date(todo.createdAt).toLocaleTimeString()}
                              </p>
                            </>
                          )}
                          {todo.done && (
                            <>
                              <p className="text-xs italic text-gray-500 mb-2">
                                Quest completed:{" "}
                                {new Date(todo.doneAt).toLocaleDateString()},{" "}
                                {new Date(todo.doneAt).toLocaleTimeString()}
                              </p>
                            </>
                          )}
                          {editID === todo.id ? (
                            <>
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full mb-4 p-2 rounded bg-white text-black"
                              />

                              <div className="mb-4">
                                <label className="block mb-1 text-sm">
                                  Priority:
                                </label>
                                <div className="flex text-xs bg-blue-200 gap-4 p-2 rounded">
                                  {priorities.map((level) => (
                                    <label
                                      key={level}
                                      className="flex items-center gap-1"
                                    >
                                      <input
                                        type="radio"
                                        name={`priority-${todo.id}`}
                                        value={level}
                                        checked={todo.priority === level}
                                        onChange={() =>
                                          dispatch({
                                            type: "SET_PRIORITY",
                                            payload: {
                                              id: todo.id,
                                              priority: level,
                                            },
                                          })
                                        }
                                      />
                                      <span className="capitalize">
                                        {level}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-end gap-2 flex-nowrap overflow-x-auto">
                                <button
                                  onClick={() => {
                                    const trimmedText = editText.trim();
                                    if (trimmedText) {
                                      dispatch({
                                        type: "EDIT_TODO",
                                        payload: {
                                          id: todo.id,
                                          text: trimmedText,
                                        },
                                      });
                                      setEditID(null);
                                      setEditText("");
                                    }
                                  }}
                                  className="text-xs px-3 py-2 bg-green-600 text-white rounded hover:bg-green-800"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditID(null);
                                    setEditText("");
                                  }}
                                  className="text-xs px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-xs uppercase text-gray-400 tracking-wide">
                                  {todo.priority || "low"}
                                </span>
                                <button
                                  onClick={() =>
                                    dispatch({
                                      type: "TOGGLE_STAR",
                                      payload: todo.id,
                                    })
                                  }
                                  className={`cursor-pointer text-yellow-400 text-lg ${
                                    todo.starred ? "font-bold" : "opacity-50"
                                  }`}
                                >
                                  ★
                                </button>
                              </div>
                              <p className={`text-xl mb-6`}>{todo.text}</p>
                              <div className="flex justify-end gap-2 flex-nowrap overflow-x-auto">
                                {!todo.done && (
                                  <button
                                    onClick={() => {
                                      setEditID(todo.id);
                                      setEditText(todo.text);
                                    }}
                                    className="text-xs px-3 py-2 bg-green-600 text-white rounded hover:bg-green-800"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    if (!todo.done) {
                                      const rect = e.currentTarget
                                        .closest("div")
                                        ?.getBoundingClientRect();
                                      if (rect) {
                                        const x = rect.left + rect.width / 2;
                                        const y = rect.top + rect.height / 2;

                                        // Convert to normalized coordinates (0–1)
                                        const originX = x / window.innerWidth;
                                        const originY = y / window.innerHeight;

                                        confetti({
                                          particleCount: 100,
                                          spread: 70,
                                          origin: { x: originX, y: originY },
                                        });
                                      }
                                    }
                                    dispatch({
                                      type: "TOGGLE_TODO",
                                      payload: todo.id,
                                    });
                                  }}
                                  className={`text-xs px-3 py-2 rounded ${
                                    todo.done
                                      ? "bg-yellow-600 text-white hover:bg-yellow-800"
                                      : "bg-blue-900 text-white hover:bg-blue-600"
                                  }`}
                                >
                                  {todo.done ? "Undo" : "Done"}
                                </button>
                                <button
                                  onClick={() =>
                                    dispatch({
                                      type: "DELETE_TODO",
                                      payload: todo.id,
                                    })
                                  }
                                  className="text-xs px-3 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default TodoList;
