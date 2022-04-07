import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Search from "../components/Search";
import { Fragment, useEffect, useRef, useState } from "react";
import { Todo } from "../utils/types";
import TodoItem from "../components/TodoItem";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, CalendarIcon } from "@heroicons/react/outline";

// Define the components props
interface HomeProps {
  todos: Array<Todo>;
}

const Home: NextPage<HomeProps> = (props: { todos: Todo[] }) => {
  let { todos } = props;

  const cancelButtonRef = useRef(null);
  const backButtonRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  // Function to create new todo
  const handleCreateTodo = async () => {
    // construct new todo, create variable, check it item.current is not null to pass type checks
    let todo: Todo = {
      title: "",
      body: "",
      date: Date.now(),
      completed: false,
    };
    if ("" !== title && "" !== body) {
      todo.title = title;
      todo.body = body;

      // Make the API request
      await fetch("http://127.0.0.1:3000/api/todos", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((res) => {
          if (res.status == 200) {
            todos.push(todo);
            setFilteredTodos(todos);
            setModalOpen(false);
            setTitle("");
            setBody("");
            // console.log(todos)
          }
        })
        .catch((err) => console.log(err));

      // after api request, push back to main page
      // router.push("/")
    }
  };

  return (
    <div className="">
      <Head>
        <title>Next Todo Assessment</title>
        <meta name="description" content="Todo app with Next JS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <div className="flex flex-1 items-center self-stretch justify-between  md:mr-4">
          <h1 className="flex-1 text-2xl font-bold text-white">Next Todo</h1>
          <Search todos={todos} setFilteredTodos={setFilteredTodos} />
        </div>
        <button
          className="hidden sm:block p-3 px-8 self-stretch sm:self-center rounded bg-blue-600 hover:bg-blue-500 font-medium text-white"
          onClick={() => setModalOpen(!modalOpen)}
        >
          Create a new Todo
        </button>
      </Header>
      <main className="flex flex-col py-6">
        <section className="px-16">
          <div className="m-8 mx-1 sm:m-8 rounded overflow-hidden">
            <div className="flex items-center gap-3 border-bottom-2 border-black  p-6 py-3 bg-blue-100">
              <p className="font-semibold flex-1 text-center">Title</p>
              <p className="font-semibold flex-1 text-center">Status</p>
              <p className="font-semibold flex-1 text-center">Date</p>
            </div>
            <ul className=" flex flex-col-reverse pb-3 bg-blue-50  ">
              {filteredTodos.length == 0 ? (
                <li className="flex items-center gap-3 border-bottom-2 border-black  p-6 py-3 ">
                  <p className="font-semibold text-gray-400 flex-1 text-center">
                    No Todos found
                  </p>
                </li>
              ) : (
                filteredTodos.map((todo) => (
                  <TodoItem key={todo._id} todo={todo} />
                ))
              )}
            </ul>
          </div>
        </section>
        {/* FAB */}
        <button
          className="block sm:hidden p-3 fixed bottom-8 right-8 h-14 w-14  rounded-full bg-blue-600 hover:bg-blue-500 font-medium text-white"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <PlusIcon />
        </button>
        {/* Create Todo Modal  */}
        <Transition.Root show={modalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={() => setModalOpen(false)}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CalendarIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 w-full sm:mt-0 sm:ml-4 text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900 text-center sm:text-left"
                        >
                          Create a new todo
                        </Dialog.Title>
                        <div className="mt-2 ">
                          <p className="text-sm text-gray-500 text-center sm:text-left mb-6">
                            Start writing your new task
                          </p>
                          <div className="grid grid-cols-3 w-full gap-6">
                            <div className="col-span-3 sm:col-span-3">
                              <label
                                htmlFor="projectName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Todo Title
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                  type="text"
                                  name="todoTitle"
                                  id="todoTitle"
                                  className="p-3 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  placeholder="Todo Title"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-span-3 sm:col-span-3">
                              <label
                                htmlFor="todoBody"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Todo Body
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <textarea
                                  name="todoBody"
                                  id="todoBody"
                                  className="p-3 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  placeholder="Description of the actual todo"
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => handleCreateTodo()}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setModalOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </div>
  );
};

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch("http://127.0.0.1:3000/api/todos");
  const todos = await res.json();
  console.log("here", todos);

  // return props
  return {
    props: { todos },
  };
}

export default Home;
