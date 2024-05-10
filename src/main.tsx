import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import { ThemeProvider } from './components/hooks/contextTheme.tsx';
import GlobalContext from './components/hooks/useGlobalContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContext>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalContext>
  </React.StrictMode>
);
