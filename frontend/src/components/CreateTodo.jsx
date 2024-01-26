import React, { useState } from 'react';

const CreateTodo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const changeHandler = (e) => {
    // Use the name attribute to distinguish between title and description
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const addTodoHandler = () => {
    // Use JSON.stringify to convert the body object to JSON
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then(async (res) => {
        if (res.status === 201) {
          const json = await res.json();
          alert("Todo added successfully");
        } else {
          alert("Failed to add todo");
        }
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <div>
      <input type="text" name="title" placeholder="Title" onChange={changeHandler} />
      <input type="text" name="description" placeholder="Description" onChange={changeHandler} />
      <button onClick={addTodoHandler}>Add a todo</button>
    </div>
  );
};

export default CreateTodo;
