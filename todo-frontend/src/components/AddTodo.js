
import React, { useState } from 'react';

const AddTodo = () => {
    const [todo, setTodo] = useState('This is a new todo');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/add-todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: todo }),
            });
             console.log("Response received:", response);

        } catch (err) {
          console.log("Error occured while adding todo", err);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodo;
