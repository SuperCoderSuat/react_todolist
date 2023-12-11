import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('select');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() !== '' && priority !== 'select') {
            setTodos([...todos, { text: newTodo, completed: false, priority }]);
            setNewTodo('');
            setPriority('select');
        }
    };

    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    const toggleTodo = (index) => {
        setTodos((prevTodos) =>
        prevTodos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo)
        );
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex space-x-2 mb-4">
            <input
                className="border p-2 flex-grow"
                type="text"
                placeholder="Enter a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <select
                className="border p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
            <option value="select" disabled>Select Priority</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            </select>
            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={addTodo}
            >
            Add Todo
            </button>
        </div>
        <ul>
            {todos.map((todo, index) => (
            <li
                key={index}
                className={`flex items-center justify-between border p-2 mb-2 ${
                todo.completed ? 'line-through' : ''
                } ${todo.priority === 'high' ? 'bg-red-500' : 'bg-green-500'}`}
            >
                <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                />
                <span className={todo.completed ? 'line-through' : ''}>
                    {todo.text}
                </span>
                </div>
                <button
                    className="bg-gray-300 p-1 rounded"
                    onClick={() => removeTodo(index)}
                >
                Remove
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TodoList;
