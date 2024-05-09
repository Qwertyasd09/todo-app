interface CheckProps {
  color?: string;
  handleCheck: (e: React.MouseEvent<SVGSVGElement>) => void;
  id: string
} 

export const Check = ({ color = "#FFF", handleCheck, id } : CheckProps) => {
  return (
    <svg className="svg-check"
        id={id}
        onClick={handleCheck}
        xmlns="http://www.w3.org/2000/svg" 
        width="11" 
        height="9">
            <path 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
                d="M1 4.304L3.696 7l6-6"
            />
    </svg>
  )
}
