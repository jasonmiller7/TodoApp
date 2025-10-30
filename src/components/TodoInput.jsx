import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import useTodos from '../context/useTodos';

function TodoInput() {
  const inputRef = useRef(null);
  const { dispatch } = useTodos();
  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem('draft') || '';
  });

  useEffect(() => {
    localStorage.setItem('draft', inputValue);
  }, [inputValue]);

  const isButtonActive = useMemo(() => {
    return inputValue.trim().length > 0;
  }, [inputValue]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    const value = inputRef.current.value.trim();
    
    if (value) {
      dispatch({ type: 'ADD_TODO', payload: value });
      
      inputRef.current.value = '';
      setInputValue(''); 
    }
  }, [dispatch]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && isButtonActive) {
      handleAdd();
    }
  }, [handleAdd, isButtonActive]);

  const buttonClasses = `
    px-4 py-2 
    bg-ps2blue 
    bg-blue-900 
    text-white 
    font-press 
    rounded 
    transition 
    shadow-lg
    ${
      isButtonActive
        ? 'hover:bg-blue-600 cursor-pointer'
        : 'opacity-50 cursor-not-allowed'
    }
  `;

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your quest..."
        value={inputValue} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyPress}
        className="w-1/2 text-xl px-4 py-2 rounded bg-ps2gray text-ps2black font-press placeholder:text-ps2black focus:outline-none focus:ring-2 focus:ring-ps2blue"
      />
      <button
        onClick={handleAdd}
        disabled={!isButtonActive} 
        className={buttonClasses} 
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;