import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  function handleTodoComplete() {
    toggleTodo(todo.id);
  }
  
  return (
    <div>
      <label className="control control-checkbox">
        <p>{todo.name}</p>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoComplete}></input>
        <div class="control_indicator"></div>
      </label>
    </div>
  )
}