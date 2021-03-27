import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'

// Ellipses

import ellipseTopLeft from './img/bg/ellipses/ellipses-top-left.svg';
import ellipseMiddleTopLeft from './img/bg/ellipses/ellipses-middle-top-left.svg';
import ellipseMiddleBottom from './img/bg/ellipses/ellipses-middle-bottom.svg';
import ellipseMiddleTopRight from './img/bg/ellipses/ellipses-middle-top-right.svg';
import ellipseBottomRight from './img/bg/ellipses/ellipses-bottom-right.svg';

// Icons

import iconAdd from './img/icons/add.svg';
import iconClear from './img/icons/trash.svg';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef(); 

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedTodos) setTodos(storedTodos);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);

    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;

    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: Math.random()*100000, name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <img src={ellipseTopLeft} alt="top left ellipses" className="bg-shapes
       bg-shapes__ellipses--top--left"></img>
      <img src={ellipseMiddleTopLeft} alt="top left ellipses" className="bg-shapes middle
       bg-shapes__ellipses--middle--top bg-shapes__ellipses--middle--left"></img>
      <img src={ellipseMiddleBottom} alt="top left ellipses" className="bg-shapes middle
       bg-shapes__ellipses--middle--bottom"></img>
      <img src={ellipseMiddleTopRight} alt="top left ellipses" className="bg-shapes middle
       bg-shapes__ellipses--middle--top bg-shapes__ellipses--middle--right"></img>
      <img src={ellipseBottomRight} alt="top left ellipses" className="bg-shapes
       bg-shapes__ellipses--bottom--right"></img>

      <div className="todo-container">
        <div className="todo-elements">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <footer>
            <div className="todo-footer--left">
              <input spellCheck="false" placeholder="I will ..." ref={todoNameRef} type="text"></input>
              <button className="icon-add" onClick={handleAddTodo}>
                <img alt="Add ToDo" src={iconAdd}></img>
              </button>
            </div>

            <div className="todo-footer--right">
              <button className="icon-clear" onClick={handleClearTodos}>
                <img alt="Clear All" src={iconClear}></img>
              </button>
              <div className="todo-counter"><p>{todos.filter(todo => !todo.complete).length}</p> <p>left</p></div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App;