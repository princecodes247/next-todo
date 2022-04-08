import Link from "next/link";
import { useEffect, useState } from "react";
import { Todo } from "../utils/types";

interface TodoItemProps {
  key?: number;
  todo: Todo;
}

  export default function TodoItem(props: TodoItemProps) {

    const [date, setDate] = useState<string>("")
    const [currDate, setCurrDate] = useState(Date.now())
    setInterval(() => {
      setCurrDate(Date.now())
  }, 10000);
      
    useEffect(() => {
      
      
      let difference = currDate - props.todo.date
      difference /= 1000
      const displayTime = difference < 10 ? "few seconds ago" 
        : difference < 60 ? Math.floor(difference) + " seconds ago" 
        : difference / 60 < 60 ? Math.floor(difference / 60) + " minutes ago" 
        : difference / 60 / 60 < 24 ? Math.floor(difference / 60 / 60) + " hours ago" 
        : difference / 60 / 60 / 24 < 2 ? "a day ago" 
        : Math.floor(difference / 60 / 60 / 24) + " days ago" 
      setDate(displayTime)
    }, [currDate])
    
    return (
     <Link href={"http://127.0.0.1:3000/todos/" + props.todo._id} >
       <li className={`flex items-center gap-3 border-bottom-2 border-black py-4 text-center text-sm hover:bg-blue-100 pr-6 ${props.todo.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
          <p className="flex-1 pl-6 truncate">
          {props.todo.title}
        </p>
        <p className="flex-1 pl-6 ">
        {props.todo.completed ? "Completed" : "Ongoing"}
        </p>
        <p className="flex-1 pl-6 ">
        {date}
        </p>
      </li>
     </Link>
    )
  }
  