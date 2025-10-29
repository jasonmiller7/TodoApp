// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { SettingsProvider } from './context/SettingsProvider';
import { BrowserRouter } from 'react-router-dom';
import TodoProvider from './context/TodoProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
