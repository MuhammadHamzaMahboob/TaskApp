import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validations
    if (!title) {
      setTitleError('Task title is required.');
      return;
    }
    if (title.length < 3 || title.length > 50) {
      setTitleError('Task title must be between 3 and 50 characters.');
      return;
    }
    if (description.length > 500) {
      setDescriptionError('Task description cannot exceed 500 characters.');
      return;
    }

    // Reset errors
    setTitleError('');
    setDescriptionError('');

    // Add the task
    onAddTask({ title, description });

    // Clear the input fields
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && <div className="error">{titleError}</div>}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {descriptionError && <div className="error">{descriptionError}</div>}
      <button type="submit" className="btn-info">Add Task</button>
    </form>
  );
};

export default TaskForm;
