import moonSvg from "../images/icon-moon.svg"

export const Header = () => {
  return (
    <div className="header">
        <h1 className="title">TODO</h1>
        <img className="theme" src={moonSvg} alt="Theme icon"/>
    </div>
  )
}
