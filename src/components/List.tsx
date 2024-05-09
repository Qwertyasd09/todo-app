import { TodoItem } from "../App";
import { ListItem } from "./ListItem";
import { Droppable } from "@hello-pangea/dnd";

interface ListProps {
  filteredTodos: TodoItem[];
  handleCheck: (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLDivElement>) => void;
}
 
export const List = ({ filteredTodos, handleCheck, handleDelete }: ListProps) => {

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
