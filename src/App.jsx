import React from 'react'
import Todo, { TodolistProvider } from './components/Todo'

const App = () => {
  return (
    <TodolistProvider>
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      <Todo/> 
      </div>
      </TodolistProvider>
  )
}

export default App