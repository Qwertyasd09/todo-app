import { MainWrapper } from "./components/MainWrapper"
import { OuterWrapper } from "./components/OuterWrapper"
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { List } from "./components/List"
import { Filter } from "./components/Filter"
import { ContainerListFilter } from "./components/ContainerListFilter"
import { DragAndDropText } from "./components/DragAndDropText"
import { useDivWidth } from "./components/hooks/useSizeWindow"
import {  useRef, useState, FormEvent } from "react"
import { DragDropContext } from "@hello-pangea/dnd"

export interface TodoItem {
  todo: string,
  id: string,
  done: boolean
}

function App() {

  const { divRef, width } = useDivWidth()
  const [todos, setTodos] = useState<TodoItem[]>([
    {todo: "Complete online JavaScript course", id: crypto.randomUUID(), done: true},
    {todo: "Jog around the park 3x", id: crypto.randomUUID(), done: false},
    {todo: "10 minutes meditation", id: crypto.randomUUID(), done: false},
    {todo: "Read for 1 hour", id: crypto.randomUUID(), done: false},
    {todo: "Pick up groseries", id: crypto.randomUUID(), done: false},
    {todo: "Complete Todo App on Frontend Mentor", id: crypto.randomUUID(), done: false}
  ])

  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "complete">("all")
  const inputField = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputField.current!.value != "") {
      const newTodo: TodoItem = {
        todo: inputField.current!.value,
        id: crypto.randomUUID(),
        done: false
      }
      setTodos([newTodo, ...todos])
      inputField.current!.value = "";
    }
  }

  const allRef = useRef<HTMLLIElement | null>(null)
  const activeRef = useRef<HTMLLIElement | null>(null)
  const completeRef = useRef<HTMLLIElement | null>(null)
  const handleFilterSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const currentOption = e.currentTarget.getAttribute("data-choice");
    switch(currentOption) {
      case "all":
        allRef.current!.className += " current-choice";
        activeRef.current!.className = "choices";
        completeRef.current!.className = "choices";
        setFilterStatus("all")
        break
      case "active":
        activeRef.current!.className += " current-choice";
        allRef.current!.className = "choices";
        completeRef.current!.className = "choices";
        setFilterStatus("active")
        break
      case "complete":
        completeRef.current!.className += " current-choice";
        allRef.current!.className = "choices";
        activeRef.current!.className = "choices";
        setFilterStatus("complete")
        break
    }
  }

  const getRef = (option: string) => {
    switch(option) {
      case "All":
        return allRef;
      case "Active":
        return activeRef;
      case "Complete":
        return completeRef;
    }
  }

  const currentItemCount = (listTodos: TodoItem[]) => {
    return listTodos.filter((todo) => todo.done === false).length
  } 

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => {
      return todo.done !== true
    }))
  }

  const getFilteredTodos = (filterStatus: "all" | "active" | "complete"): TodoItem[] => {
    let filteredTodos: TodoItem[] = []
    if (filterStatus === "all") {
      filteredTodos = todos.map((todo) => {return {...todo}})
    } else if (filterStatus === "active") {
      filteredTodos = todos.map(todo => {return {...todo}}).filter((todo) => todo.done !== true)
    } else if (filterStatus === "complete") {
      filteredTodos = todos.map(todo => {return {...todo}}).filter((todo) => todo.done === true)
    } 
    return filteredTodos
  }

  let filteredTodos: TodoItem[] = getFilteredTodos(filterStatus)

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId && destination.index === source.index
    ) {
      return;
    }

    const indexOne = todos.findIndex(
      todo => todo.id === filteredTodos[source.index].id
    );
    const indexTwo = todos.findIndex(
      todo => todo.id === filteredTodos[destination.index].id
    );

    const newOrder = [...todos];
    const firstItem = newOrder[indexOne];
    newOrder.splice(indexOne, 1);
    newOrder.splice(indexTwo, 0, firstItem);
    setTodos(newOrder);
  }

  const handleDelete = (e:  React.MouseEvent<HTMLDivElement>) => {
    const currentListItem = e.target as HTMLDivElement
    const deletedTodoId = currentListItem.getAttribute("id");
    setTodos(todos.filter((todo) => (todo.id != deletedTodoId)))
  }

  const handleCheck = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>): void => {
    const checkedTodo = e.currentTarget.getAttribute("id");
    e.stopPropagation()
    setTodos(todos.map((todo) => {
      if (todo.id === checkedTodo) {
        return {
          ...todo,
          done: !todo.done
        }
      } else {
        return todo;
      }
    }))
  }

  return (
    <OuterWrapper divRef={divRef} width={width}>
      <MainWrapper>
        <Header />
        <Input handleSubmit={handleSubmit} inputField={inputField}/>
        <ContainerListFilter>
          <DragDropContext onDragEnd={onDragEnd}>
            <List handleCheck={handleCheck} handleDelete={handleDelete} filteredTodos={filteredTodos}/> 
          </DragDropContext>
          <Filter activeItems={currentItemCount(todos)} handleFilterSelect={handleFilterSelect} handleClearCompleted={handleClearCompleted} getRef={getRef} width={width}/>
        </ContainerListFilter>
        <DragAndDropText />
      </MainWrapper>
    </OuterWrapper>
  )
}

export default App
