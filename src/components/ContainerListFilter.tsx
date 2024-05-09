import { ReactNode } from "react"

interface ContainerListFilterProps {
    children: ReactNode
}

export const ContainerListFilter = ({ children }: ContainerListFilterProps) => {
  return (
    <div className="container-list-filter">
        { children }
    </div>
  )
}
