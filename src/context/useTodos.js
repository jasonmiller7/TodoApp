// src/context/useTodos.js
import { useContext } from 'react';
import TodoContext from './TodoContext';

const useTodos = () => useContext(TodoContext);

export default useTodos;

export { useTodos };