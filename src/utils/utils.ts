import { TodoItem } from '../components/types/types';
import { FilterSelect } from '../components/types/types';
import { Refs } from '../components/types/types';
import { TodoActions } from '../components/types/types';
import { TodoKind } from '../components/types/types';

export const currentItemCount = (listTodos: TodoItem[]) => {
  return listTodos.filter((todo) => todo.done === false).length;
};

export const getFilteredTodos = (
  filterStatus: 'all' | 'active' | 'complete',
  state: TodoItem[]
): TodoItem[] => {
  let filteredTodos: TodoItem[] = [];
  if (filterStatus === 'all') {
    filteredTodos = state.map((todo) => {
      return { ...todo };
    });
  } else if (filterStatus === 'active') {
    filteredTodos = state
      .map((todo) => {
        return { ...todo };
      })
      .filter((todo) => todo.done !== true);
  } else if (filterStatus === 'complete') {
    filteredTodos = state
      .map((todo) => {
        return { ...todo };
      })
      .filter((todo) => todo.done === true);
  }
  return filteredTodos;
};

export const getRef = (
  option: string,
  { allRef, activeRef, completeRef }: Refs
) => {
  switch (option) {
    case 'All':
      return allRef;
    case 'Active':
      return activeRef;
    case 'Complete':
      return completeRef;
  }
};

export const handleFilterSelect = (
  e: React.MouseEvent<HTMLLIElement>,
  { Refs, setFilterStatus }: FilterSelect
) => {
  const currentOption = e.currentTarget.getAttribute('data-choice')!;
  const { allRef, activeRef, completeRef } = Refs;
  switch (currentOption) {
    case 'all':
      allRef.current!.className += ' current-choice';
      activeRef.current!.className = 'choices';
      completeRef.current!.className = 'choices';
      setFilterStatus('all');
      break;
    case 'active':
      activeRef.current!.className += ' current-choice';
      allRef.current!.className = 'choices';
      completeRef.current!.className = 'choices';
      setFilterStatus('active');
      break;
    case 'complete':
      completeRef.current!.className += ' current-choice';
      allRef.current!.className = 'choices';
      activeRef.current!.className = 'choices';
      setFilterStatus('complete');
      break;
  }
};

export const reducer = (state: TodoItem[], action: TodoActions) => {
  switch (action.type) {
    case TodoKind.SUBMIT:
      action.payload.e.preventDefault();
      if (action.payload.inputField.currentInputValue) {
        const newTodo: TodoItem = {
          todo: action.payload.inputField.currentInputValue,
          id: crypto.randomUUID(),
          done: false
        };
        action.payload.inputField.inputRef.current!.value = '';
        return [...state, newTodo];
      }
      return state;

    case TodoKind.CLEAR_COMPLETED:
      return state.filter((todo) => todo.done !== true);

    case TodoKind.DELETE:
      const currentListItem = action.payload.target as HTMLDivElement;
      const deletedTodoId = currentListItem.getAttribute('id');
      return state.filter((todo) => todo.id != deletedTodoId);

    case TodoKind.CHECK:
      const checkedTodo = (
        action.payload.target as HTMLDivElement | SVGSVGElement
      ).getAttribute('id');
      action.payload.stopPropagation();
      return state.map((todo) => {
        if (todo.id === checkedTodo) {
          return {
            ...todo,
            done: !todo.done
          };
        } else {
          return todo;
        }
      });

    case TodoKind.DRAG:
      const { destination, source } = action.payload.e;
      if (!destination) {
        return state;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }
      const indexOne = state.findIndex(
        (todo) => todo.id === action.payload.filteredTodos[source.index].id
      );
      const indexTwo = state.findIndex(
        (todo) => todo.id === action.payload.filteredTodos[destination.index].id
      );
      const newOrder = [...state];
      const firstItem = newOrder[indexOne];
      newOrder.splice(indexOne, 1);
      newOrder.splice(indexTwo, 0, firstItem);
      return newOrder;

    default:
      return state;
  }
};
