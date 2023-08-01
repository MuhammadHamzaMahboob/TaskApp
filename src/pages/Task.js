import React from 'react';

const Task = ({ task, onDeleteTask, onToggleTask }) => {
  return (
    <li>
      <h3>{task.title} </h3>
      <p>{task.description ? task.description : 'Description not defined'}</p>
      {task.completed ? (
        <button className="btn-info" onClick={() => onToggleTask(task.id)}>
          Mark Incomplete
        </button>
      ) : (
        <button className="btn-success" onClick={() => onToggleTask(task.id)}>
          Mark Complete
        </button>
      )}
      <button className="btn-danger" onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

export default Task;
