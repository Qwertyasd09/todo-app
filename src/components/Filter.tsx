import { useGlobalContext } from './hooks/useGlobalContext';
import { TodoActions, TodoKind } from './types/types';
import { Refs } from './types/types';

interface FilterProps {
  activeItems: number;
  width?: number;
  dispatch: React.Dispatch<TodoActions>;
  setFilterStatus: React.Dispatch<
    React.SetStateAction<'all' | 'active' | 'complete'>
  >;
  Refs: Refs;
}

export const Filter = ({
  activeItems,
  width,
  dispatch,
  setFilterStatus,
  Refs
}: FilterProps) => {
  const options: string[] = ['All', 'Active', 'Complete'];
  const { handleFilterSelect, getRef } = useGlobalContext();
  if (width! > 768) {
    return (
      <div className="filter">
        <p>{activeItems} items left</p>
        <ul className="inner-filter">
          {options.map((option: string) => (
            <li
              onClick={(e) => handleFilterSelect(e, { setFilterStatus, Refs })}
              key={option}
              data-choice={option.toLowerCase()}
              className={
                option === 'All' ? 'choices current-choice' : 'choices'
              }
              ref={getRef(option, Refs)}
            >
              {option}
            </li>
          ))}
        </ul>
        <p
          onClick={() => dispatch({ type: TodoKind.CLEAR_COMPLETED })}
          className="choices complete"
        >
          Clear Completed
        </p>
      </div>
    );
  } else {
    return (
      <div className="filter-container">
        <div className="filter top">
          <p>{activeItems} items left</p>
          <p
            onClick={() => dispatch({ type: TodoKind.CLEAR_COMPLETED })}
            className="choices complete"
          >
            Clear Completed
          </p>
        </div>
        <div className="filter bottom">
          <ul className="inner-filter">
            {options.map((option: string) => (
              <li
                onClick={(e) =>
                  handleFilterSelect(e, { Refs, setFilterStatus })
                }
                key={option}
                data-choice={option.toLowerCase()}
                className={
                  option === 'All' ? 'choices current-choice' : 'choices'
                }
                ref={getRef(option, Refs)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
