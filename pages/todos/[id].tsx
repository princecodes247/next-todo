import { Todo } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

// Define Prop Interface
interface ShowProps {
  todo: Todo
  url: string
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter()

  // set the todo as state for modification
  const [todo, setTodo] = useState<Todo>(props.todo)

  // function to complete a todo
  const handleComplete = async () => {
    
      // make copy of todo with completed set to true
      const newTodo: Todo = { ...todo, completed: !todo.completed }
      // make api call to change completed in database
      await fetch(props.url + "/" + todo._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        // send copy of todo with property
        body: JSON.stringify(newTodo),
      })
      // once data is updated update state so ui matches without needed to refresh
      setTodo(newTodo)
    
    // if completed is already true this function won't do anything
  }

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + "/" + todo._id, {
      method: "delete",
    })
    //push user back to main page after deleting
    router.push("/")
  }

  //return JSX
  return (
    <div className="flex h-screen flex-col">
      <Header>
      <h1 className="flex-1 text-2xl font-bold text-white">Next Todo</h1>
      </Header>
      <main className="flex flex-1 flex-col h-full items-center mx-4 sm:mx-32 lg:mx-48">
      <div className="flex self-stretch justify-between p-3 items-center">
        <h1 className="font-bold text-xl" >Todo title: {todo.title}</h1>
        <h2 className="text-xl">{todo.completed ? "Completed" : "In Progress"}</h2>
      </div>
      <div className=" self-stretch flex-1 p-3 h-full">
        
        <h2 className="font-semibold">Todo Details</h2>
        <p>{todo.body}</p>
        
      </div>
      <div className="p-3 flex items-center gap-4">
      <button className={`p-3 px-6 font-medium  rounded text-white ${todo.completed ? "bg-blue-600 hover:bg-blue-500" : "bg-green-600 hover:bg-green-500"}`} onClick={handleComplete} >{todo.completed ? "Ongoing" : "Complete"}</button>
      <button className="p-3 px-6 font-medium bg-red-600 hover:bg-red-500 rounded text-white" onClick={handleDelete}>Delete</button>
      <button className="p-3 px-6 font-medium bg-gray-600 hover:bg-gray-500 rounded text-white"
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back
      </button>
      </div>
    </main>
    <Footer/>
    </div>
  )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  let url = process.env.API_URL + "/api/todos"
  // fetch the todo, the param was received via context.query.id
  console.log("Result", context.resolvedUrl)
  const res = await fetch(url + "/" + context.query.id)
  const todo = await res.json()

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { todo, url } }
}

// export component
export default Show