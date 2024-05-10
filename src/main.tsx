import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { ThemeProvider } from './hooks/contextTheme.tsx';
import GlobalContext from './hooks/useGlobalContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContext>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalContext>
  </React.StrictMode>
);
