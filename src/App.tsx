import { MainWrapper } from "./assets/components/MainWrapper"
import { OuterWrapper } from "./assets/components/OuterWrapper"
import { Header } from "./assets/components/Header"
import { Input } from "./assets/components/Input"
import { List } from "./assets/components/List"
import { Filter } from "./assets/components/Filter"
import { useDivWidth } from "./assets/components/hooks/useSizeWindow"
import { ContainerListFilter } from "./assets/components/ContainerListFilter"
import { DragAndDropText } from "./assets/components/DragAndDropText"

function App() {
  const { divRef, width } = useDivWidth();
  return (
    <OuterWrapper divRef={divRef}>
      <MainWrapper>
        <Header />
        <Input />
        <ContainerListFilter>
          <List /> 
          <Filter />
        </ContainerListFilter>
        <DragAndDropText />
      </MainWrapper>
    </OuterWrapper>
  )
}

export default App
