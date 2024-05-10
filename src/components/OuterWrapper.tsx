import bgDesktopLigth from "../assets/images/bg-desktop-light.jpg";
import bgMobileLigth from "../assets/images/bg-mobile-light.jpg";
import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";
import bgMobileDark from "../assets/images/bg-mobile-dark.jpg";
import { useTheme } from "./hooks/contextTheme";
import { WrapperProps } from "./types/types";

interface OuterWrapperProps extends WrapperProps {
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
