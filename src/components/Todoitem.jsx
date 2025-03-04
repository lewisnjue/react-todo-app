import React, { useContext } from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import { todolistContext } from './Todo';

const Todoitem = ({ text, id, isComplete }) => {
  const { todolist, setTodolist } = useContext(todolistContext);

  const toggleComplete = () => {
    setTodolist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const deleteTodo = () => {
    setTodolist(todolist.filter((item) => item.id !== id));
  };

  return (
    <div className='flex items-center my-3 gap-2'>
      {/* Toggle complete state */}
      <div className='flex flex-1 items-center cursor-pointer' onClick={toggleComplete}>
        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
        <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? 'line-through' : ''}`}>
          {text}
        </p>
      </div>

      {/* Delete Todo */}
      <img onClick={deleteTodo} className='w-3.5 cursor-pointer' src={delete_icon} alt="Delete" />
    </div>
  );
};

export default Todoitem;
