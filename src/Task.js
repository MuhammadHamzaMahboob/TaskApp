import React from 'react';

const Task = ({ task, onDeleteTask, onToggleTask }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.completed ? (
        <button onClick={() => onToggleTask(task.id)}>Mark Incomplete</button>
      ) : (
        <button onClick={() => onToggleTask(task.id)}>Mark Complete</button>
      )}
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default Task;
