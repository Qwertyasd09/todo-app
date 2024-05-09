import { ReactNode } from "react";

interface MainWrapperProps {
    children: ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <div className="main-wrapper">
      { children }
    </div>
  )
}
