interface FilterProps {
  handleFilterSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
  getRef: (option: string) => React.MutableRefObject<HTMLLIElement | null> | undefined;
  activeItems: number;
  handleClearCompleted: () => void;
  width?: number;
}

export const Filter = ({ handleFilterSelect, getRef, activeItems, handleClearCompleted, width }: FilterProps) => {
  const options: string[] = ["All", "Active", "Complete"]
  
  if (width! > 768) {
    return (
      <div className="filter">
          <p>{activeItems} items left</p>
          <ul className="inner-filter">
            {options.map((option: string) => (
              <li 
                onClick={handleFilterSelect} 
                key={option} 
                data-choice={option.toLowerCase()} 
                className={(option === "All") ? "choices current-choice" : "choices"}
                ref={getRef(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <p onClick={handleClearCompleted} className="choices complete">Clear Completed</p>
      </div>
    )
  } else {
    return (
      <div className="filter-container">
        <div className="filter top">
          <p>{activeItems} items left</p>
          <p onClick={handleClearCompleted} className="choices complete">Clear Completed</p>
        </div>
        <div className="filter bottom">
          <ul className="inner-filter">
            {options.map((option: string) => (
              <li 
                onClick={handleFilterSelect} 
                key={option} 
                data-choice={option.toLowerCase()} 
                className={(option === "All") ? "choices current-choice" : "choices"}
                ref={getRef(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

}
