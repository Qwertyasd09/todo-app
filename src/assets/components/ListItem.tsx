import { Check } from "./icons/Check"
import { TodoItem } from "../../App"
import { Cross } from "./icons/Cross"
import { Draggable } from "@hello-pangea/dnd"

interface ListItemProps {
    todo: TodoItem;
    handleCheck: (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => void;
    handleDelete: (e: React.MouseEvent<HTMLDivElement>) => void;
    index: number;
}

export const ListItem = ({todo, handleCheck, handleDelete, index}: ListItemProps) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
            <div className="dragable" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={todo.id}>
                <div className="item-container" key={todo.id} >
                    <div id={todo.id} onClick={handleCheck} className={"check " + (todo.done ? "done" : "hover")}>
                        <Check color={todo.done ? "#FFF" : "transparent"} handleCheck={handleCheck} id={todo.id}/>
                    </div>
                    <li className={todo.done ? "checked-todo" : undefined}>
                        {todo.todo}
                    </li>
                    <div className="icon-cross" onClick={handleDelete}>
                        <Cross id={todo.id}/>
                    </div>
                </div>
                <hr />
            </div>
        )}
    </Draggable>
  )
}
