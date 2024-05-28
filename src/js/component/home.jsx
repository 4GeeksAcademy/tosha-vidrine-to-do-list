// src/Home.jsx

import React, { useState } from 'react';
import '../../styles/index.css'; // Ensure correct path to your CSS file

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="chalkboard">
      <h1 className="title">To Do List</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new to do"
          className="inputField"
        />
        <button onClick={handleAddTodo} className="addButton">
          ✓
        </button>
      </div>
      <ul className="todoList">
        {todos.map((todo, index) => (
          <li key={index} className="todoItem">
            <span>{todo}</span>
            <button onClick={() => handleDeleteTodo(index)} className="deleteButton">
              ✗
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
