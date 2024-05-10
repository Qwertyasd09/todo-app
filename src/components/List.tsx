import { ListItem } from './ListItem';
import { Droppable } from '@hello-pangea/dnd';
import { TodoItem, TodoActions } from '../types/types';

interface ListProps {
  filteredTodos: TodoItem[];
  dispatch: React.Dispatch<TodoActions>;
}

export const List = ({ dispatch, filteredTodos }: ListProps) => {
  return (
    <Droppable droppableId="column-drop">
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="list"
        >
          {filteredTodos.map((todo, index) => (
            <ListItem
              key={todo.id}
              todo={todo}
              dispatch={dispatch}
              index={index}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
