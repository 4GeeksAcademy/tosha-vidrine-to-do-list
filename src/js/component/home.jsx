import React, { useState, useEffect } from 'react';
import '../../styles/index.css'; // Ensure correct path to your CSS file

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
   getTodos()
  }, []);
const getTodos = async () => {
  let response = await fetch ("https://playground.4geeks.com/todo/users/tosha_vidrine")
  if (response.status!=200){
    let result= await createList()
    if (result==false){alert("There seems to be a problem with the backend currently. Please try again later.")}
    else {getTodos()}
  } 
  else {
    let data=await response.json()
    if (Array.isArray(data.todos)) {
      setTodos(data.todos);
    } else {
      console.error('Fetched data is not an array:', data);
    }
  }
}
  const createList = async() => {
    let response=await fetch("https://playground.4geeks.com/todo/users/tosha_vidrine",{
      method:"POST"
    })
    if(response.status!=201){
      return false 
    }else{return true}
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = { label: inputValue, done: false };

      // Send the new todo to the server
      try {
        const response = await fetch('https://playground.4geeks.com/todo/todos/tosha_vidrine', { // Replace with your API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });

        if (response.ok) {
          const addedTodo = await response.json();
          setTodos([...todos, addedTodo]);
          setInputValue('');
        } else {
          console.error('Error adding todo:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (index) => {
    const todoToDelete = todos[index];

    // Delete the todo from the server
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoToDelete.id}`, { // Replace with your API endpoint
        method: 'DELETE',
      });

      if (response.ok) {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="chalkboard">
      <h1 className="title">To Do List</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
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
            <span>{todo.label}</span>
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
