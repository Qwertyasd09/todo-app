import { DropResult } from '@hello-pangea/dnd';
import { FormEvent, ReactNode } from 'react';

export interface TodoItem {
  todo: string;
  id: string;
  done: boolean;
}

export interface WrapperProps {
  children: ReactNode;
}

export enum TodoKind {
  SUBMIT = 'SUBMIT',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
  DRAG = 'DRAG',
  DELETE = 'DELETE',
  CHECK = 'CHECK'
}

type DragType = {
  type: TodoKind.DRAG;
  payload: { e: DropResult; filteredTodos: TodoItem[] };
};
type SubmitType = {
  type: TodoKind.SUBMIT;
  payload: {
    e: FormEvent<HTMLFormElement>;
    inputField: {
      inputRef: React.MutableRefObject<HTMLInputElement | null>;
      currentInputValue: string | null;
    };
  };
};
type DeleteType = {
  type: TodoKind.DELETE;
  payload: React.MouseEvent<HTMLDivElement>;
};
type CheckType = {
  type: TodoKind.CHECK;
  payload: React.MouseEvent<HTMLDivElement | SVGSVGElement>;
};
type ClearCompletedType = { type: TodoKind.CLEAR_COMPLETED };

export type TodoActions =
  | SubmitType
  | DeleteType
  | DragType
  | CheckType
  | ClearCompletedType;

export interface Refs {
  allRef: React.MutableRefObject<HTMLLIElement | null>;
  activeRef: React.MutableRefObject<HTMLLIElement | null>;
  completeRef: React.MutableRefObject<HTMLLIElement | null>;
}

export interface FilterSelect {
  Refs: Refs;
  setFilterStatus: (
    value: React.SetStateAction<'all' | 'active' | 'complete'>
  ) => void;
}
