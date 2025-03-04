import React, { createContext, useRef, useState,useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitem from './Todoitem';

// Create Context
const todolistContext = createContext();

const TodolistProvider = ({ children }) => {
	const [todolist,setTodolist] = useState(()=>{
		const savedTodos = localStorage.getItem('todos');
		return savedTodos ? JSON.parse(savedTodos) : []

	})
	useEffect(()=>{
		localStorage.setItem('todos',JSON.stringify(todolist))
	},[todolist])

  return (
    <todolistContext.Provider value={{ todolist, setTodolist }}>
      {children}
    </todolistContext.Provider>
  );
};

const Todo = () => {
  const { todolist, setTodolist } = React.useContext(todolistContext); // Use context
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodolist((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      {/* ------------title----------------*/}
      <div className='flex items-center mt-7 gap-2'>
        <img src={todo_icon} alt="" className='w-8'/>
        <h1 className='text-3xl font-semibold'>To-Do list</h1>
      </div>
      {/*-------------input box---------------*/}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input 
          ref={inputRef} 
          type="text" 
          placeholder='Add your task' 
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
        />
        <button 
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer' 
          onClick={add}
        >
          ADD +
        </button>
      </div>
      {/*------------todo list -------------*/}
      <div>
        {todolist.map((item, index) => (
          <Todoitem key={item.id} text={item.text} id={item.id} isComplete={item.isComplete} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
export { todolistContext, TodolistProvider };
