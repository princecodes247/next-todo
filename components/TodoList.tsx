import Link from "next/link";
import { useEffect, useState } from "react";
import { Todo } from "../utils/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
    filteredTodos: Todo[];
    url: string;
}

  export default function TodoList(props: TodoListProps) {
    
    return (
        <div className="m-8 mx-1 sm:m-8 rounded overflow-hidden">
        <div className="flex items-center gap-3 border-bottom-2 border-black  p-6 py-3 bg-blue-100">
          <p className="font-semibold flex-1 text-center">Title</p>
          <p className="font-semibold flex-1 text-center">Status</p>
          <p className="font-semibold flex-1 text-center">Date</p>
        </div>
        <ul className=" flex flex-col-reverse pb-3 bg-blue-50  ">
          {props.filteredTodos.length == 0 ? (
            <li className="flex items-center gap-3 border-bottom-2 border-black  p-6 py-3 ">
              <p className="font-semibold text-gray-400 flex-1 text-center">
                No Todos found
              </p>
            </li>
          ) : (
            props.filteredTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} url={props.url} />
            ))
          )}
        </ul>
      </div>
    )
  }
  