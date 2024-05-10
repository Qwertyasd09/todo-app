import { useTheme } from '../hooks/contextTheme';
import moonSvg from '../assets/images/icon-moon.svg';
import sunSvg from '../assets/images/icon-sun.svg';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="header">
      <h1 className="title">TODO</h1>
      <img
        onClick={toggleTheme}
        className="theme"
        src={theme === 'light' ? moonSvg : sunSvg}
        alt="Theme icon"
      />
    </div>
  );
};
