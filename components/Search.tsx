import React, { useEffect, useState } from "react"
import { Todo } from "../utils/types";

  export default function Search(props: { todos: Todo[]; setFilteredTodos: any }) {
    const [searchValue, setSearchValue] = useState<string>("")
    useEffect(() => {
      if(searchValue.length > 1){
        let newArr = props.todos.filter(todo=> {
          return todo.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        props.setFilteredTodos(newArr)
      } else {
        props.setFilteredTodos(props.todos)
      }
    
      
    }, [searchValue])
    
    return (
      <div className=" flex-1 p-1 py-2 flex justify-center bg-blue-0">
        <input type="text" placeholder="Search"
        className="p-3 py-2 rounded border-gray-900 border-1 w-72"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        />
      </div>
    )
  }
  