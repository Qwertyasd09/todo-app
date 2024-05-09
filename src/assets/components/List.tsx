import { TodoItem } from "../../App";
import { ListItem } from "./ListItem";
import { Droppable } from "@hello-pangea/dnd";

interface ListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  filteredTodos: TodoItem[];
}
 
export const List = ({ todos, setTodos, filteredTodos }: ListProps) => {
  
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
    <Droppable droppableId="column-drop">{(provided) => (
      <ul ref={provided.innerRef} {...provided.droppableProps} className="list">
        {filteredTodos.map((todo, index) => (
          <ListItem
            key={todo.id}
            todo={todo}
            handleCheck={handleCheck}
            handleDelete={handleDelete} 
            index={index}
          />
        ))}
        {provided.placeholder}
      </ul>
    )}
    </Droppable>
  )
}
