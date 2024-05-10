import { TodoActions } from '../types/types';
import { TodoKind } from '../types/types';
import { useState } from 'react';
import { useRef } from 'react';

interface InputProps {
  dispatch: React.Dispatch<TodoActions>;
}

export const Input = ({ dispatch }: InputProps) => {
  const inputField = useRef<HTMLInputElement | null>(null);
  const [currentInputValue, setCurrentInputValue] = useState<string | null>(
    null
  );

  return (
    <form
      onSubmit={(event) =>
        dispatch({
          type: TodoKind.SUBMIT,
          payload: {
            e: event,
            inputField: {
              inputRef: inputField,
              currentInputValue: currentInputValue
            }
          }
        })
      }
    >
      <div className="input-container">
        <div className="check"></div>
        <input
          onChange={(e) => setCurrentInputValue(e.target.value)}
          ref={inputField}
          type="text"
          id="todo"
          name="todo"
          className="input"
          placeholder="Create a new todo..."
        />
        <input type="submit" hidden />
      </div>
    </form>
  );
};
