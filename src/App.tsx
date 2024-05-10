import { MainWrapper } from './components/MainWrapper';
import { OuterWrapper } from './components/OuterWrapper';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { List } from './components/List';
import { Filter } from './components/Filter';
import { ContainerListFilter } from './components/ContainerListFilter';
import { DragAndDropText } from './components/DragAndDropText';
import { useDivWidth } from './components/hooks/useSizeWindow';
import { useRef, useState, useReducer } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useGlobalContext } from './components/hooks/useGlobalContext';
import { TodoItem } from './components/types/types';
import { TodoKind } from './components/types/types';

function App() {
  const { reducer, getFilteredTodos, currentItemCount } = useGlobalContext();
  const { divRef, width } = useDivWidth();
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'complete'
  >('all');
  const [state, dispatch] = useReducer(reducer, [
    {
      todo: 'Complete online JavaScript course',
      id: crypto.randomUUID(),
      done: true
    },
    { todo: 'Jog around the park 3x', id: crypto.randomUUID(), done: false },
    { todo: '10 minutes meditation', id: crypto.randomUUID(), done: false },
    { todo: 'Read for 1 hour', id: crypto.randomUUID(), done: false },
    { todo: 'Pick up groseries', id: crypto.randomUUID(), done: false },
    {
      todo: 'Complete Todo App on Frontend Mentor',
      id: crypto.randomUUID(),
      done: false
    }
  ]);

  const allRef = useRef<HTMLLIElement | null>(null);
  const activeRef = useRef<HTMLLIElement | null>(null);
  const completeRef = useRef<HTMLLIElement | null>(null);
  const filteredTodos: TodoItem[] = getFilteredTodos(filterStatus, state);

  return (
    <OuterWrapper divRef={divRef} width={width}>
      <MainWrapper>
        <Header />
        <Input dispatch={dispatch} />
        <ContainerListFilter>
          <DragDropContext
            onDragEnd={(result) =>
              dispatch({
                type: TodoKind.DRAG,
                payload: { e: result, filteredTodos: filteredTodos }
              })
            }
          >
            <List dispatch={dispatch} filteredTodos={filteredTodos} />
          </DragDropContext>
          <Filter
            setFilterStatus={setFilterStatus}
            Refs={{ allRef, activeRef, completeRef }}
            dispatch={dispatch}
            activeItems={currentItemCount(state)}
            width={width}
          />
        </ContainerListFilter>
        <DragAndDropText />
      </MainWrapper>
    </OuterWrapper>
  );
}

export default App;
