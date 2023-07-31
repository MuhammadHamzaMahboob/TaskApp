import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDeleteTask, onToggleTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
