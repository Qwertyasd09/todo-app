import { ReactNode } from "react";
import bgDesktopLigth from "../images/bg-desktop-light.jpg";
import bgMobileLigth from "../images/bg-mobile-light.jpg";

interface OuterWrapperProps {
    children: ReactNode;
    divRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const OuterWrapper = ({ children, divRef }: OuterWrapperProps) => {
  return (
    <div className="outer-wrapper" ref={divRef}>
      <picture>
        <source media="(min-width: 425px)" srcSet={bgDesktopLigth} />
        <source media="(max-width: 375px)" srcSet={bgMobileLigth} />
        <img style={{minHeight: "300px"}} src={bgDesktopLigth} alt="Desktop bg" />
      </picture>
      { children }
    </div>
  )
}
