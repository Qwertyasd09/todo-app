import { createContext, useContext, useState, useLayoutEffect } from 'react';
import { WrapperProps } from '../types/types';

type ThemeStateType = 'light' | 'dark';

interface ThemeContext {
  theme: ThemeStateType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider = ({ children }: WrapperProps) => {
  const [theme, setTheme] = useState<ThemeStateType>('light');
  const toggleTheme = () =>
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  useLayoutEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
