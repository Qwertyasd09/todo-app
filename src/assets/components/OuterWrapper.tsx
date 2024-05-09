import { ReactNode } from "react";
import bgDesktopLigth from "../images/bg-desktop-light.jpg";
import bgMobileLigth from "../images/bg-mobile-light.jpg";
import bgDesktopDark from "../images/bg-desktop-dark.jpg";
import bgMobileDark from "../images/bg-mobile-dark.jpg";
import { useTheme } from "./hooks/contextTheme";

interface OuterWrapperProps {
    children: ReactNode;
    divRef: React.MutableRefObject<HTMLDivElement | null>;
    width: number;
}

export const OuterWrapper = ({ children, divRef, width }: OuterWrapperProps) => {

  const { theme } = useTheme()

  return (
    <div className="outer-wrapper" ref={divRef}>
      <picture>
        <source media="(min-width: 425px)" srcSet={(theme === "light") ? bgDesktopLigth : bgDesktopDark} />
        <source media="(max-width: 375px)" srcSet={(theme === "light" ? bgMobileLigth : bgMobileDark)} />
        <img style={(width > 425) ? {minHeight: "300px"} : {minHeight: "200px"}} src={(theme === "light") ? bgDesktopLigth: bgDesktopDark} alt="Desktop bg" />
      </picture>
      { children }
    </div>
  )
}
