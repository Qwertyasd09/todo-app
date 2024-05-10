import { Check } from './icons/Check';
import { TodoItem, TodoKind, TodoActions } from '../types/types';
import { Cross } from './icons/Cross';
import { Draggable } from '@hello-pangea/dnd';

interface ListItemProps {
  todo: TodoItem;
  index: number;
  dispatch: React.Dispatch<TodoActions>;
}

export const ListItem = ({ todo, index, dispatch }: ListItemProps) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          className="dragable"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={todo.id}
        >
          <div className="item-container" key={todo.id}>
            <div
              id={todo.id}
              onClick={(event) =>
                dispatch({ type: TodoKind.CHECK, payload: event })
              }
              className={'check ' + (todo.done ? 'done' : 'hover')}
            >
              <Check
                color={todo.done ? '#FFF' : 'transparent'}
                dispatch={dispatch}
                id={todo.id}
              />
            </div>
            <li className={todo.done ? 'checked-todo' : undefined}>
              {todo.todo}
            </li>
            <div
              className="icon-cross"
              onClick={(event) =>
                dispatch({ type: TodoKind.DELETE, payload: event })
              }
            >
              <Cross id={todo.id} />
            </div>
          </div>
          <hr />
        </div>
      )}
    </Draggable>
  );
};
