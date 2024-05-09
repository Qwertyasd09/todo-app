import moonSvg from "../images/icon-moon.svg"
import sunSvg from "../images/icon-sun.svg";
import { useTheme } from "./hooks/contextTheme";

export const Header = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className="header">
        <h1 className="title">TODO</h1>
        <img onClick={toggleTheme} className="theme" src={(theme === "light") ? moonSvg : sunSvg} alt="Theme icon"/>
    </div>
  )
}
