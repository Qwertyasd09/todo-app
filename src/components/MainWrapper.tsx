import { WrapperProps } from "./types/types";

export const MainWrapper = ({ children }: WrapperProps) => {
  return (
    <div className="main-wrapper">
      { children }
    </div>
  )
}
