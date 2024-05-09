import { FormEvent } from "react"

interface InputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputField: React.LegacyRef<HTMLInputElement> | undefined;
}

export const Input = ({ handleSubmit, inputField }: InputProps) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
          <div className="check"></div>
          <input ref={inputField} type="text" id="todo" name="todo" className="input" placeholder="Create a new todo..."/>
          <input type="submit" hidden />
      </div>
    </form>
  )
}
