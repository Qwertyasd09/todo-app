import { TodoActions, TodoKind } from '../types/types';

interface CheckProps {
  color?: string;
  id: string;
  dispatch: React.Dispatch<TodoActions>;
}

export const Check = ({ color = '#FFF', dispatch, id }: CheckProps) => {
  return (
    <svg
      className="svg-check"
      id={id}
      onClick={(event) => dispatch({ type: TodoKind.CHECK, payload: event })}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
};
